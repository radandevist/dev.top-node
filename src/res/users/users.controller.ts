import { NextFunction, Request, Response } from "express";

import { ok } from "../../helpers/responseFormatter";
import { AppError } from "../../classes/AppError";

import { GetUserProfileParams, GetUserProfilePostsResource, SearchUsersQuery } from "./users.validations";
import {
  searchUsers, getUserProfile, findUserProfilePosts, findUserByUserName,
} from "./users.services";

export function getUsersHandler(_req: Request, _res: Response, next: NextFunction) {
  try {
    // log.info("request body", req.body);
    // res.status(200).send(ok(req.body));
    throw new AppError(500, "intentional throw");
  } catch (error) {
    next(error);
  }
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

export async function getUserProfilePostsHandler(
  req: Request<GetUserProfilePostsResource["params"], AnyObj, AnyObj, GetUserProfilePostsResource["query"]>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await findUserByUserName(req.params.userName);
    if (!user) throw new AppError(404, "User not found");

    const result = await findUserProfilePosts({
      userName: req.params.userName,
      limit: req.query.limit,
      page: req.query.page,
    });

    res.status(200).send(ok(result));
  } catch (error) {
    next(error);
  }
}
