import { Request, Response, NextFunction } from "express";

import { ok } from "../../helpers/responseFormatter";
import { AppError } from "../../classes/AppError";
import { createSession, deleteSessionById, verifySession } from "../sessions/sessions.services";

import {
  createAccessToken,
  registerUser,
  setRefreshCookie,
  loginUser,
  clearRefreshCookie,
} from "./auth.services";
import { LoginBody, RegisterBody } from "./auth.validations";

export async function registerHandler(
  req: Request<EmptyObj, EmptyObj, RegisterBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { firstName, confirmPassword: _, ...restOfReqBody } = req.body;
    const { message, user } = await registerUser({
      ...restOfReqBody,
      ...(firstName ? { firstName } : { firstName: null }),
    });

    if (message) throw new AppError(409, message);

    res.status(201).send(ok({ user }));
  } catch (error) {
    next(error);
  }
}

export async function loginHandler(
  req: Request<EmptyObj, EmptyObj, LoginBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { expired, session, decoded } = await verifySession(req);

    if (expired) {
      await deleteSessionById(decoded.sessionId);
      clearRefreshCookie(res);
    }

    if (session) throw new AppError(409, "Already logged in");

    const user = await loginUser(req.body);

    if (!user) throw new AppError(401, "Email or password invalid");

    const newSession = await createSession({
      userId: user.id,
      IPAddress: req.socket.remoteAddress || "not-defined",
      userAgent: req.headers["user-agent"] || "not-defined",
    });

    setRefreshCookie(res, newSession.token);

    const { token, expiredAt } = createAccessToken({ userId: user.id });

    res.status(201).send(ok({ accessToken: `Bearer ${token}`, user, expiredAt }));
  } catch (error) {
    next(error);
  }
}

export async function refreshHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { expired, session, decoded } = await verifySession(req);

    if (expired) {
      await deleteSessionById(decoded.sessionId);
      clearRefreshCookie(res);
    }

    if (!session) {
      throw new AppError(401, "Login required");
    }

    const { token, expiredAt } = createAccessToken({ userId: session.userId });

    res.status(200).send(ok({ accessToken: `Bearer ${token}`, user: session.user, expiredAt }));
  } catch (error) {
    next(error);
  }
}

export async function logoutHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { session, decoded } = await verifySession(req);

    if (!session) throw new AppError(401, "Already logged out");

    await deleteSessionById(decoded.sessionId);
    clearRefreshCookie(res);

    res.status(201).send(ok({ user: session.user }));
  } catch (error: any) {
    next(error);
  }
}
