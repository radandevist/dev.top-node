import {
  Request, Response, NextFunction,
} from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../../classes/AppError";
import { Role } from "../../config/roles";
import { jwt as jwtConfig } from "../../config/jwt";
import { findUserById } from "../users/users.services";

import { AccessTokenPayload } from "./auth.services";

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization?.split(" ")[1];

    const { userId } = jwt.verify(
      accessToken || "",
      jwtConfig.accessToken.secret,
    ) as AccessTokenPayload;

    req.user = await findUserById(userId) || undefined;

    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError
      || error instanceof jwt.NotBeforeError
      || error instanceof jwt.TokenExpiredError
    ) {
      next(new AppError(401, "Authentication required"));
      return;
    }
    next(error);
  }
}

export function authorize(roles: Role[]) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!roles.includes(req.user?.role || "" as Role)) {
        throw new AppError(403, "Permission denied");
      }

      next();
    } catch (error: any) {
      next(error);
    }
  };
}
