import { getSWCJestConfig } from "./scripts/utils/jestConfigUtils.js";

/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('jest').Config} */
export default {
  setupFiles: ["./dotenv.js"],
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      getSWCJestConfig(".swcrc.build"),
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
