const path = require("path");
const fs = require("fs");

/**
   * The earlier in this array, the higher priority is.
   */
const envFilesByPriority = Object.freeze([
  `.env.${env}.local`,
  `.env.${env}`,
  ".env.local",
  ".env",
]);

exports.getEnvFile = (env) => {
  let envPath;
  for (const envFile of envFilesByPriority) {
    const fullPath = path.join(process.cwd(), envFile);
    if (!fs.existsSync(fullPath)) continue;
    envPath = fullPath;
    break;
  }
  if (!envPath) throw new Error("no valid .env file found");
  return envPath;
};
