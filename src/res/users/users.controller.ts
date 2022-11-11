import { Request, Response } from "express";

export function createUser(req: Request, res: Response) {
  console.log(req.body);
  res.send({ message: "user creation" });
}
