import { Request, Response } from "express";

import { log } from "../../helpers/logger";
import { ok } from "../../helpers/responseFormatter";

export function createUserHandler(req: Request<AnyObj, AnyObj, { oof: "oof" }>, res: Response) {
  log.info("request body", req.body);
  res.status(200).send(ok(req.body));
}

export function sum(a: number, b: number) {
  return a + b;
}
