/* eslint-disable no-param-reassign */
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import { generateRandomString } from "../../utils/stringUtils";
import { prisma } from "../../infra/prisma";
// import { log } from "../../helpers/logger";

async function getUserName(userName: any, lastName: any) {
  let whileCondition = true;
  do {
    userName = lastName + generateRandomString(5);
    // eslint-disable-next-line no-await-in-loop
    const foundUser = await prisma.user.findUnique({ where: { userName } });
    whileCondition = !!foundUser;
  } while (whileCondition);

  return userName;
}

/**
 * Automatically assign an userName if it is omitted in the input
 */
export const setUserUserNameOnCreate: Prisma.Middleware = async (params, next) => {
  if (params.model === "User") {
    if (params.action === "create") {
      // eslint-disable-next-line prefer-const
      let { userName, lastName } = params.args.data;

      if (userName) return next(params);

      params.args.data.userName = await getUserName(userName, lastName);

      return next(params);
    }

    if (params.action === "createMany") {
      await Promise.all(params.args.data.map(async (element: any) => {
        // eslint-disable-next-line prefer-const
        let { userName, lastName } = element;

        if (userName) return;

        element.userName = await getUserName(userName, lastName);
      }));

      return next(params);
    }
  }

  return next(params);
};

async function hashPassword(password: any) {
  return bcrypt.hash(password, await bcrypt.genSalt());
}

/**
 * Automatically hash input password
 */
export const hashUserPasswordOnCreateAndUpdate: Prisma.Middleware = async (params, next) => {
  if (params.model === "User") {
    if (params.action === "create" || params.action === "update") {
      if (!params.args.data.password) {
        return next(params);
      }

      params.args.data.password = await hashPassword(params.args.data.password);

      return next(params);
    }

    if (params.action === "createMany" || params.action === "updateMany") {
      await Promise.all(params.args.data.map(async (element: any) => {
        element.password = await hashPassword(element.password);
      }));

      return next(params);
    }
  }

  return next(params);
};
