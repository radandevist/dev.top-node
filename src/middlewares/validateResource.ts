import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

import { log } from "../helpers/logger";

// const resourceSchema = z.object({
//   body: z.record(z.any()),
//   query: z.record(z.any()),
//   params: z.record(z.any()),
// }).partial();

// export type ResourceSchema = typeof resourceSchema;

// export type ResourceObject = z.infer<ResourceSchema>;
// export const a: ResourceObject = {};

export function validateResource(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      log.error("resource validation failed", error.errors);
      res.status(400).send(error.errors);
    }
  };
}
