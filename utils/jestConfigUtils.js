import { readFileSync } from "fs";

/**
 * @typedef {import('@swc/core').Config} SWCConfig
 */

/**
 * The .swcrc file (or any other swc config file we created) could excludes *.{test,spec}.ts files
 * from compilation. However when running jest those are the files we want to compile, so we make
 * a bit of processing to the swc file by removing the "exclude" property and pass the rest to
 * transform options in jest.config.js
 *
 * @param {string} swcConfigPath - The path to the swc config file to process.
 * @returns {SWCConfig} The processed config;
 */
export const getSWCJestConfig = (swcConfigPath) => {
  const { exclude: _, ...jestSwcRc } = JSON.parse(readFileSync(swcConfigPath, "utf-8"));
  return jestSwcRc;
};
