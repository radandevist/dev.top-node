import { join } from "path";
import { existsSync, lstatSync } from "fs";

const allowedEnvironments = Object.freeze(["development", "production", "test"]);

/**
 * Given an environment variable, gets the path to the corresponding .env file.
 *
 * @param {"development" | "production" | "test"} env - The current environment variable.
 * @returns {string} The absolute path to the environment variable file.
 */
export function getEnvFile(env) {
  if (!allowedEnvironments.includes(env)) {
    throw Error(`unknown environment: '${env}'`);
  }

  /**
   * The earlier in this array, the higher priority is.
   */
  const envFilesByPriority = Object.freeze([
    `.env.${env}.local`,
    `.env.${env}`,
    ".env.local",
    ".env",
  ]);

  const envPath = ["", ...envFilesByPriority].reduce((prev, current) => {
    if (prev) return prev;
    const fullPath = join(process.cwd(), current);
    if (existsSync(fullPath) && lstatSync(fullPath).isFile()) return fullPath;
    return "";
  });

  if (!envPath) throw Error("no valid .env file found");
  return envPath;
}
