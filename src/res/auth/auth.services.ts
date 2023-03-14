import { Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

// import { User } from "../users/users.entity";
// import { usersRepository } from "../../infra/dataSource";
// import { generateRandomString } from "../../utils/stringUtils";
import { jwt as jwtConfig } from "../../config/jwt";
import { findUserByEmail, findUserByUserName } from "../users/users.services";
import { prisma } from "../../infra/prisma";

export type RegisterInput = Pick<User, "email" | "password" | "lastName" | "firstName"> & {
  // eslint-disable-next-line max-len
  userName?: string; // * Optional input but required in db schema, so generated by us if omitted by the user
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

  const userName = input.userName
    || ""; // * important, a prisma middleware (hook) will assign an userName in this case.

  // const assignedUserName = input.userName;

  // if (!assignedUserName) {
  //   let whileCondition = true;

  //   do {
  //     assignedUserName = input.lastName + generateRandomString(5);
  //     // eslint-disable-next-line no-await-in-loop
  //     const foundUser = await prisma.user.findFirst({ where: { userName: assignedUserName } });
  //     whileCondition = !!foundUser;
  //   } while (whileCondition);
  // }

  // const user = await usersRepository.save(usersRepository.create(input));
  const user = await prisma.user.create({
    data: {
      ...input,
      userName,
    },
  });

  // successResult
  return {
    message: null,
    user,
  };
}

export type LoginInput = Required<Pick<User, "email" | "password">>;

async function comparePassword(candidatePassword: string, userPassword: string) {
  return bcrypt.compare(candidatePassword, userPassword);
}

export async function loginUser(input: LoginInput) {
  const user = await findUserByEmail(input.email);
  if (!user) return null;
  // if (!await user.comparePassword(input.password)) return null;
  if (!await comparePassword(input.password, user.password)) return null;
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
