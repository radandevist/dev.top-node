import { OpenAPIV3 } from "openapi-types";

// import packageJSON from "../../package.json" assert { type: "json" };
import packageJSON from "../../package.json";

import { author, port } from "./app";

const {
  name, version, description, license, licenseUrl,
} = packageJSON;

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  servers: [
    {
      url: `http://localhost:${port}/api`,
      description: "Local development server",
    },
  ],
  info: {
    title: name,
    version,
    description,
    license: {
      name: license,
      url: licenseUrl,
    },
    contact: author,
  },
  paths: {
    "/users": {
      get: {
        responses: {
          200: {
            description: "ok",
          },
        },
      },
    },
  },
};
