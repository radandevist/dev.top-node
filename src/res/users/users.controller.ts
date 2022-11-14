import { Request, Response } from "express";

import { log } from "../../helpers/logger";

export function createUser(req: Request, res: Response) {
  log.info("request body", req.body);
  res.send({ message: "user creation" });
}

export function sum(a: number, b: number) {
  return a + b;
}
