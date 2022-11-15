import { createLogger, format, transports } from "winston";
import { consoleFormat } from "winston-console-format";
import { StreamOptions } from "morgan";

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
  transports: [
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
  ],
});

export const stream: StreamOptions = {
  write(message: string) {
    log.silly(message);
  },
};
