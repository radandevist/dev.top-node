import { Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../users/users.entity";
import { usersRepository } from "../../infra/dataSource";
import { jwt as jwtConfig } from "../../config/jwt";
import { findUserByEmail, findUserByUserName } from "../users/users.services";

export type RegisterInput = Pick<User, "email" | "password" | "lastName" | "firstName"> & {
  userName?: string;
};

type RegisterResult =
| {
  message: string;
  user: null;
}
| {
  message: null;
  user: User;
};

export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  const errorResult = {
    message: "",
    user: null,
  };

  const [userWithEmail, userWithUserName] = await Promise.all([
    findUserByEmail(input.email),
    ...(input.userName ? [findUserByUserName(input.userName)] : []),
  ]);

  if (userWithEmail) {
    errorResult.message = "Email already in use";
    return errorResult;
  }
  if (userWithUserName) {
    errorResult.message = "UserName already in use";
    return errorResult;
  }

  const user = await usersRepository.save(usersRepository.create(input));
  // successResult
  return {
    message: null,
    user,
  };
}

export type LoginInput = Required<Pick<User, "email" | "password">>;

export async function loginUser(input: LoginInput) {
  const user = await findUserByEmail(input.email);
  if (!user) return null;
  if (!await user.comparePassword(input.password)) return null;
  return user;
}

export type AccessTokenPayload = {
  userId: string;
  // sessionId: string;
};

export function createAccessToken(payload: AccessTokenPayload) {
  const { secret, lifeTime } = jwtConfig.accessToken;
  const token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: lifeTime });

  return {
    token,
    expiredAt: Date.now() + (lifeTime * 1000),
  };
}

export function setRefreshCookie(res: Response, token: string) {
  res.cookie(jwtConfig.refreshToken.cookieName, token, { httpOnly: true });
}

export function clearRefreshCookie(res: Response) {
  res.clearCookie(jwtConfig.refreshToken.cookieName);
}
