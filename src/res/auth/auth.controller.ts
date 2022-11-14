import { Request, Response } from "express";

import { log } from "../../helpers/logger";
import { usersRepository } from "../users/users.repository";

import { RegisterBody } from "./auth.validations";

export async function register(req: Request<EmptyObj, EmptyObj, RegisterBody>, res: Response) {
  try {
    const user = await usersRepository.save(usersRepository.create(req.body));
    log.info("registered user", user);
    res.status(200).send(user);
  } catch (error) {
    log.error(error);
    res.status(500).send(error);
  }
}
