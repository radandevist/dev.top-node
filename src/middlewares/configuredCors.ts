import cors from "cors";

import { clientUrl } from "../config/app";
import { Environment, environment } from "../config/environment";

/**
 * Pre configured cors setup.
 * In function of the current running environment.
 * In test environment we have to allow the tester to request the api.
 * In development and production only the defined clientUrl will be allowed.
 */
export function configuredCors() {
  return cors(
    environment !== Environment.TEST
      // * For dev or when working with browser as client
      ? {
        origin: clientUrl,
        credentials: true,
      }
      // * For test or when working with postman/etc as client
      : undefined,
  );
}
