import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import { generateRandomString } from "../../utils/stringUtils";
import { prisma } from "../../infra/prisma";
// import { log } from "../../helpers/logger";

/**
 * Automatically assign an userName if it is omitted in the input
 */
export const setUserUserNameOnCreate: Prisma.Middleware = async (params, next) => {
  console.log('====================================');
  console.log(params);
  console.log('====================================');

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
  // return;
};

export const hashUserPasswordOnCreateAndUpdate: Prisma.Middleware = async (params, next) => {
  // console.log('====================================');
  // console.log(params);
  // console.log('====================================');
  if (params.model === "User") {
    if (
      params.action === "create"
      || params.action === "createMany"
      || params.action === "update"
      || params.action === "updateMany"
    ) {
      // eslint-disable-next-line prefer-const
      // console.log('====================================');
      // log.info('wtf', params.args);
      // console.log('====================================');

      if (!params.args.data.password) {
        await next(params);
        return;
      }

      // eslint-disable-next-line no-param-reassign
      params.args.data.password = await bcrypt
        .hash(params.args.data.password, await bcrypt.genSalt());
    }
  }
  next(params);
  // return;
};
