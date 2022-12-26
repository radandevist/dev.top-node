import { Request } from "express";
import jwt from "jsonwebtoken";

import { sessionsRepository } from "../../infra/dataSource";
import { jwt as jwtConfig } from "../../config/jwt";

import { RefreshTokenPayload, Session } from "./sessions.entity";

type CreateSessionInput = Pick<Session, "IPAddress" | "userAgent" | "user">;

export async function createSession(input: CreateSessionInput) {
  const session = sessionsRepository.create(input);
  return sessionsRepository.save(session);
}

type VerifySessionResult =
| { // successResult
  // valid: true;
  session: Session;
  expired: false;
  decoded: RefreshTokenPayload;
}
| { // errorResult
  // valid: false;
  session: null;
  expired: boolean;
  decoded: RefreshTokenPayload;
};

export async function verifySession(req: Request): Promise<VerifySessionResult> {
  const token = req.cookies[jwtConfig.refreshToken.cookieName];
  const IPAddress = req.socket.remoteAddress || "not-defined";
  const userAgent = req.headers["user-agent"] || "not-defined";

  const errorResult = {
    session: null,
    expired: false,
  };

  let decoded: RefreshTokenPayload;
  try {
    (decoded = jwt
      .verify(token, jwtConfig.refreshToken.secret) as RefreshTokenPayload);
  } catch (error: any) {
    (decoded = jwt.decode(token) as RefreshTokenPayload);

    if (error instanceof jwt.TokenExpiredError) {
      errorResult.expired = true;
    }

    return { decoded, ...errorResult };
  }

  const session = await sessionsRepository.findOne({ where: { id: decoded.sessionId }, relations: ["user"] });

  if (
    !session
    || (userAgent !== session.userAgent)
    || (IPAddress !== session.IPAddress)
    || (decoded.userId !== session.user.id)
  ) {
    return { decoded, ...errorResult };
  }

  // successResult
  return {
    session,
    decoded,
    expired: false,
  };
}

export async function deleteSessionById(id: string) {
  await sessionsRepository.delete({ id });
}
