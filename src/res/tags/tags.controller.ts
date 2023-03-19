import { NextFunction, Request, Response } from "express";

import { ok } from "../../helpers/responseFormatter";

import { GetManyTagsQuery, SearchTagsQuery } from "./tags.validations";
import { findManyTags, searchTags } from "./tags.services";

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

export async function searchTagsHandler(
  req: Request<EmptyObj, EmptyObj, EmptyObj, SearchTagsQuery>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await searchTags(req.query);
    res.send(ok(result));
  } catch (error: any) {
    next(error);
  }
}
