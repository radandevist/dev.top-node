import { join } from "path";
import { existsSync } from "fs";

/**
 * Given an environment variable, gets the path to the corresponding .env file.
 *
 * @param {"development" | "production" | "test"} env - The current environment variable.
 * @returns {string} The absolute path to the environment variable file.
 */
export function getEnvFile(env) {
  /**
   * The earlier in this array, the higher priority is.
   */
  const envFilesByPriority = Object.freeze([
    `.env.${env}.local`,
    `.env.${env}`,
    ".env.local",
    ".env",
  ]);

  let envPath;

  for (const envFile of envFilesByPriority) {
    const fullPath = join(process.cwd(), envFile);
    if (!existsSync(fullPath)) continue;
    envPath = fullPath;
    break;
  }
  if (!envPath) throw new Error("no valid .env file found");
  return envPath;
};