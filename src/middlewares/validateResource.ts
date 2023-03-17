import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

import { AppError } from "../classes/AppError";

export function validateResource(schema: AnyZodObject) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = result.body;
      req.query = result.query;
      req.params = result.params;

      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const appError = new AppError(400, error.errors[0].message);
        next(appError);
        return;
      }
      next(error);
    }
  };
}
