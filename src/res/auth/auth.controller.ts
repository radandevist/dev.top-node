import { Request, Response } from "express";

import { log } from "../../helpers/logger";
import { findUserByEmail, findUserByUserName } from "../users/users.services";

import { registerUser } from "./auth.services";
import { RegisterBody } from "./auth.validations";

export async function registerHandler(
  req: Request<EmptyObj, EmptyObj, RegisterBody>,
  res: Response,
) {
  try {
    const [userWithEmail, userWithUserName] = await Promise.all([
      findUserByEmail(req.body.email),
      ...(req.body.userName ? [findUserByUserName(req.body.userName)] : []),
    ]);

    if (userWithEmail) {
      res.status(400).send("Email already in use");
      return;
    }
    if (userWithUserName) {
      res.status(400).send("UserName already in use");
      return;
    }

    const user = await registerUser(req.body);
    log.info("registered user", user);
    res.status(200).send(user);
  } catch (error) {
    log.error(error);
    res.status(500).send(error);
  }
}
