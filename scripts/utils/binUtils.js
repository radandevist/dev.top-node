import path from "path";

const CWD = process.cwd();

export const binPath = (binary) => path.join(CWD, "/node_modules/.bin", binary);
