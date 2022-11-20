import { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import { Environment, environment } from "../config/environment";
import { stream } from "../helpers/logger";

/**
 * Pre configured morgan setup.
 * In function of the current running environment.
 * I don't want morgan to print anything during tests.
 */
export function configuredMorgan() { // eslint-disable-line, consistent-return, max-len
  return environment !== Environment.TEST
    ? morgan("combined", { stream })
    : (_req: Request, _res: Response, next: NextFunction) => {
      next();
    };
}
