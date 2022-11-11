import { config } from "dotenv";

import { getEnvFile } from "./utils/dotenvUtils";

// ! Don't import `src/config/*` or anything else in this file!
// * Dotenv has to load the env files before anything else!
const env = process.env.NODE_ENV || "development";

/**
 * The dotenv module will override any variables passed to the command,
 * if it is also defined in th .env file.
 */
config({ path: getEnvFile(env) });
