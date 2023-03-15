// import packageJSON from "../../package.json" assert { type: "json" };
import packageJSON from "../../package.json";

const { author: npmAuthor } = packageJSON;

const {
  ADMIN_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  AUTHOR_WEBSITE,
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  PORT,
  API_BASE_PATH,
  // DOCS_PATH,
  CLIENT_URL,
} = process.env;

export const port = Number(PORT) || 3300;

// export const docsPath = (DOCS_PATH && `/${DOCS_PATH}`) || "/api-docs";

export const apiBasePath = (API_BASE_PATH && `/${API_BASE_PATH}`) || "/api";

/**
 * Information about the author of the project
 */
export const author = {
  name: AUTHOR_NAME || npmAuthor?.name || ADMIN_NAME || "author",
  email: AUTHOR_EMAIL || npmAuthor?.email || ADMIN_EMAIL || "author@mail.com",
  url: AUTHOR_WEBSITE || npmAuthor?.url || "https://author-website.example.com",
};

/**
 * Information about the administrator of the application.
 * The author of the project and the application's administrator could be:
 * - the same person
 * - different persons.
 */
export const admin = {
  name: ADMIN_NAME || AUTHOR_NAME || "admin",
  email: ADMIN_EMAIL || AUTHOR_EMAIL || "admin@mail.com",
  password: ADMIN_PASSWORD || "0123456789123",
};

/**
 * Url of the front-end side (the client application) of this api.
 * Useful for CORS purposes.
 */
export const clientUrl = CLIENT_URL || "http://localhost:3000";
