import {
  Request,
  Response,
  NextFunction,
} from "express";

import { log } from "../helpers/logger";
import { err } from "../helpers/responseFormatter";
import { AppError } from "../classes/AppError";

// Error handling Middleware function for logging the error message
export function errorLogger(
  error: any,
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError && error.statusCode < 500) {
    log.warn(`${error.message}`);
    next(error);
    return;
  }
  log.error(error);
  next(error); // calling next middleware
}

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
export function errorResponder(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = error.statusCode || 500;
  res.status(status).send(err(error.message));
}
