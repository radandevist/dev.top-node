import { join } from "path";
import { existsSync } from "fs";

import { Router } from "express";
import { z } from "zod";

import { resources, resourcesDir } from "../constants/resources";

export const apiRouter = Router();

const routesModuleSchema = (routesModuleName: string) => z.object({
  path: z.string({
    required_error: `The module '${routesModuleName}' must have a 'path' exported member`,
    invalid_type_error: `The exported member 'path' in '${routesModuleName}' must be a string`,
  }),
  router: z.function(z.tuple([]).rest(z.any()), z.unknown(), {
    required_error: `The module '${routesModuleName}' must have a 'router' exported member`,
    invalid_type_error: `The exported member 'router' in '${routesModuleName}' must be an express router`,
  }),
});

Promise.all(resources.map(async (resource) => {
  const routesModuleName = `${resource}.routes`;
  const routesModulePath = join(resourcesDir, resource, routesModuleName);

  if (!existsSync(`${routesModulePath}.js`)) return;

  const routesModule = routesModuleSchema(routesModuleName).parse(await import(routesModulePath));

  apiRouter.use(routesModule.path, routesModule.router);
}));
