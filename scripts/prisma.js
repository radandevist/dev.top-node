/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/extensions */

/**
 * Wrapper script around the Prisma CLI to automatically load different .env files
 */

// import { spawn } from "child_process";
const { spawn } = require("child_process");

// import chalk from "chalk";
const chalk = require("chalk");

// import { getEnvFile } from "./utils/dotenvUtils.js";
// import { binPath } from "./utils/binUtils.js";
const { getEnvFile } = require("./utils/dotenvUtils");
const { binPath } = require("./utils/binUtils");

const env = process.env.NODE_ENV || "development";

const [,, ...cliArguments] = process.argv;

const envFile = getEnvFile(env).split("/").splice(-1)[0];

const binary = "dotenv";
const execCommand = binPath(binary);
const execOptions = ["-e", envFile, "--", "prisma", ...cliArguments];

// process.exit();
// eslint-disable-next-line no-console
console.log(chalk.gray("$", binary, ...execOptions));
spawn(execCommand, execOptions, {
  stdio: "inherit",
  env: { ...process.env },
});
