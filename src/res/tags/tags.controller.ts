import { NextFunction, Request, Response } from "express";

import { ok } from "../../helpers/responseFormatter";

import { GetManyTagsQuery } from "./tags.validations";
import { findManyTags } from "./tags.services";

export async function getManyTagsHandler(
  req: Request<EmptyObj, EmptyObj, EmptyObj, GetManyTagsQuery>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await findManyTags(req.query);
    res.send(ok(result));
  } catch (error: any) {
    next(error);
  }
}
