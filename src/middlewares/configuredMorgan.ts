import {
  Request, Response, NextFunction, RequestHandler,
} from "express";
import morgan from "morgan";

import { Environment, environment } from "../config/environment";
import { log } from "../helpers/logger";

/**
 * Pre configured morgan setup.
 * In function of the current running environment.
 * I don't want morgan to print anything during tests.
 */
export function configuredMorgan(): RequestHandler {
  switch (environment) {
    case Environment.DEVELOPMENT:
      return morgan("dev", {
        stream: {
          write(message: string) {
            log.http(message.trim());
          },
        },
      });

    // eslint-disable-next-line max-len
    case Environment.PRODUCTION:
      /*
        When in production:
        - log the http requests which resulted with a 5xx status into a file: log/request-errors.log
          the file to log these http request is defined in the logger's transports
        - morgan's skip option callback help us to filter the http response status so only the
          request which ended with 5xx are processed.
        - in the logger's file transports an httpFilter is ensuring that only the logging with
          a level of 'http' are logged into the desired file and nothing else above or below that
          level.
        resources:
        https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
        https://signoz.io/blog/morgan-logger
      */
      return morgan(
        // eslint-disable-next-line prefer-arrow-callback, arrow-body-style
        (tokens, req, res) => {
          return JSON.stringify({
            remote_addr: tokens["remote-addr"](req, res) || null,
            remote_user: tokens["remote-user"](req, res) || null,
            date: tokens.date(req, res, "clf") || null,
            method: tokens.method(req, res) || null,
            url: tokens.url(req, res) || null,
            http_version: tokens["http-version"](req, res) || null,
            status: Number.parseFloat(tokens.status(req, res) || ""),
            content_length: tokens.res(req, res, "content-length"),
            referrer: tokens.referrer(req, res) || null,
            user_agent: tokens["user-agent"](req, res) || null,
            response_time: Number.parseFloat(tokens["response-time"](req, res) || ""),
          });
        },
        {
          stream: {
            write(message) {
              const data = JSON.parse(message);
              log.http("incoming-request", data);
            },
          },
          skip(_req, res) {
            return res.statusCode < 500;
          },
        },
      );

    default:
      return (_req: Request, _res: Response, next: NextFunction) => {
        next();
      };
  }
}
