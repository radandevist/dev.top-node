import { createLogger, format, transports } from "winston";
import { consoleFormat } from "winston-console-format";
import "winston-daily-rotate-file"; // require in docs

import { isProd } from "../config/environment";

// for ensuring tha only errors (not above or below that level) are logged
const errorFilter = format((info, _opts) => (info.level === "error" ? info : false));

// for ensuring tha only http (not above or below that level) are logged
const httpFilter = format((info, _opts) => (info.level === "http" ? info : false));

const devTransports = [
  new transports.Console({
    format: format.combine(
      format.colorize({ all: true }),
      format.padLevels(),
      consoleFormat({
        showMeta: true,
        metaStrip: ["timestamp", "service"],
        inspectOptions: {
          depth: Infinity,
          colors: true,
          maxArrayLength: Infinity,
          breakLength: 120,
          compact: Infinity,
        },
      }),
    ),
  }),
];

const prodTransports = [
  new transports.DailyRotateFile({
    level: "error",
    filename: "logs/app-errors-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
    format: format.combine(errorFilter()),
  }),
  new transports.DailyRotateFile({
    level: "http",
    filename: "logs/http-errors-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
    format: format.combine(httpFilter()),
  }),
];

/**
 * The logger instance to use throughout this entire project.
 *
 * @example
 * logger.silly("Logging initialized");
 * logger.debug("Debug an object", { make: "Ford", model: "Mustang", year: 1969 });
 *
 * logger.verbose("Returned value", { value: util.format });
 * logger.info("Information", {
 *   options: ["Lorem ipsum", "dolor sit amet"],
 *   values: ["Donec augue eros, ultrices."],
 * });
 * logger.warn("Warning");
 * logger.error(new Error("Unexpected error"));
 */
export const log = createLogger({
  level: "silly",
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: "Test" },
  transports: isProd ? prodTransports : devTransports,
});
