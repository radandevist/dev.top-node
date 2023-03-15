/* eslint-disable @typescript-eslint/no-var-requires */
// import path from "path";
const path = require("path");

const CWD = process.cwd();

// export const binPath = (binary) => path.join(CWD, "/node_modules/.bin", binary);
exports.binPath = (binary) => path.join(CWD, "/node_modules/.bin", binary);
