import { NextFunction, Request, Response } from "express";

import { log } from "../../helpers/logger";
import { ok } from "../../helpers/responseFormatter";
import { AppError } from "../../classes/AppError";

import { GetUserProfileParams, SearchUsersQuery } from "./users.validations";
import { searchUsers, getUserProfile } from "./users.services";

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
    res.status(200).send(ok(result));
  } catch (error) {
    next(error);
  }
}

export async function getUserProfileHandler(
  req: Request<GetUserProfileParams>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await getUserProfile(req.params);

    if (!result.user) throw new AppError(404, "User not found");

    res.status(200).send(ok(result));
  } catch (error) {
    next(error);
  }
}
