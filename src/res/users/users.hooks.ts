import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import { generateRandomString } from "../../utils/stringUtils";
import { prisma } from "../../infra/prisma";

/**
 * Automatically assign an userName if it is omitted in the input
 */
export const setUserUserNameOnCreate: Prisma.Middleware = async (params, next) => {
  if (params.model === "User") {
    if (
      params.action === "create"
      || params.action === "createMany"
    ) {
      // eslint-disable-next-line prefer-const
      let { userName, lastName } = params.args.data;

      if (userName) {
        return next(params);
      }

      let whileCondition = true;
      do {
        userName = lastName + generateRandomString(5);
        // const foundUser = await usersRepository.findOne({ where: { userName: this.userName } });
        // eslint-disable-next-line no-await-in-loop
        const foundUser = await prisma.user.findUnique({ where: { userName } });
        whileCondition = !!foundUser;
      } while (whileCondition);
    }
  }
  return next(params);
};

export const hashUserPasswordOnCreateAndUpdate: Prisma.Middleware = async (params, next) => {
  if (params.model === "User") {
    if (
      params.action === "create"
      || params.action === "createMany"
      || params.action === "update"
      || params.action === "updateMany"
    ) {
      // eslint-disable-next-line prefer-const
      let { password } = params.args.data;

      if (!password) {
        return next(params);
      }

      password = await bcrypt.hash(password, await bcrypt.genSalt());
    }
  }
  return next(params);
};
