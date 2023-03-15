/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getSWCJestConfig } = require("./scripts/utils/jestConfigUtils");

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('jest').Config} */
module.exports = {
  setupFiles: ["./scripts/dotenv.js"],
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      getSWCJestConfig(".swcrc.build"),
    ],
  },
  // extensionsToTreatAsEsm: [".ts", ".tsx"],
};
