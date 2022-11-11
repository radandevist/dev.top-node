/*
 * We are using mysql with typeORM
 * So the config have to correspond with that
 */
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

export const host = DB_HOST || "localhost";

export const port = Number(DB_PORT) || 3306;

export const username = DB_USER || "test";

export const password = DB_PASSWORD || "test";

/**
 * The database name.
 */
export const database = DB_NAME || "test";
