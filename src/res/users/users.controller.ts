import { NextFunction, Request, Response } from "express";

import { log } from "../../helpers/logger";
import { ok } from "../../helpers/responseFormatter";

import { SearchUsersQuery } from "./users.validations";
import { searchUsers } from "./users.services";

export function getUserHandler(req: Request, res: Response) {
  log.info("request body", req.body);
  res.status(200).send(ok(req.body));
}

export async function searchUsersHandler(
  req: Request<EmptyObj, EmptyObj, EmptyObj, SearchUsersQuery>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await searchUsers(req.query);
    res.send(ok(result));
  } catch (error) {
    next(error);
  }
}
