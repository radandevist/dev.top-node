// import { v4 } from "uuid";
import { Request } from "express";
import jwt from "jsonwebtoken";
import cuid from "@bugsnag/cuid";
import { Session, User } from "@prisma/client";

// import { sessionsRepository } from "../../infra/dataSource";
import { jwt as jwtConfig } from "../../config/jwt";
import { prisma } from "../../infra/prisma";

// import { RefreshTokenPayload, Session } from "./sessions.entity";

export type RefreshTokenPayload = {
  userId: string;
  sessionId: string;
};

type CreateSessionInput = Pick<Session, "IPAddress" | "userAgent" | "userId">;

function createToken(userId: string) {
  const sessionId = cuid();

  const { secret, lifeTime } = jwtConfig.refreshToken;
  const payload: RefreshTokenPayload = { userId, sessionId };

  const token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: lifeTime });
  return token;
}

export async function createSession(input: CreateSessionInput) {
  // const session = sessionsRepository.create(input);
  // return sessionsRepository.save(session);
  const token = createToken(input.userId);
  return prisma.session.create({ data: { ...input, token } });
}

type VerifySessionResult =
| { // successResult
  // valid: true;
  session: Session & { user: User };
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

  // eslint-disable-next-line max-len
  // const session = await sessionsRepository.findOne({ where: { id: decoded.sessionId }, relations: ["user"] });
  const session = await prisma.session.findUnique({
    where: { id: decoded.sessionId },
    include: {
      user: true,
    },
  });

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
  // await sessionsRepository.delete({ id });
  await prisma.session.delete({ where: { id } });
}
