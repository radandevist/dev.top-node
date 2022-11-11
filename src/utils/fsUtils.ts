import { readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Gets the current file's name.
 *
 * Replacement to `__filename` because it is not defined in ES module scope.
 */
export const currentFile = () => fileURLToPath(import.meta.url);

/**
 * Gets the current directory's name.
 *
 * Replacement to `__dirname` because it is not defined in ES module scope.
 */
export const currentDir = () => dirname(currentFile());

/**
 * Gets the list of directories names in the given parent directory source.
 *
 * @param {string} source - The source directory to list.
 */
export function getDirectories(source: string) {
  return readdirSync(resolve(currentDir(), source), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}
