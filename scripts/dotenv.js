/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/extensions */ // necessary when in esm

// import { config } from "dotenv";
// import { expand } from "dotenv-expand";
const { config } = require("dotenv");
const { expand } = require("dotenv-expand");

// import { getEnvFile } from "./utils/dotenvUtils.js";
const { getEnvFile } = require("./utils/dotenvUtils");

// ! Don't import `src/config/*` or anything else in this file!
// * Dotenv has to load the env files before anything else!
const env = process.env.NODE_ENV || "development";

/**
 * The dotenv module will override any variables passed to the command,
 * if it is also defined in th .env file.
 */
const dotConf = config({ path: getEnvFile(env) });

/**
 * @see https://github.com/motdotla/dotenv-expand
 */
expand(dotConf);
