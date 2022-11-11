import { resolve } from "path";

import { Router } from "express";

import { currentDir } from "../utils/fsUtils";
import { RoutesExportsNames, routesExportsNames } from "../config/routes";
import { resources } from "../constants/resources";

export const apiRouter = Router();

resources.map(async (resource) => {
  const routesFileRelativePath = `../res/${resource}/${resource}.routes`;

  const routesImport: Record<string, any> = await import(routesFileRelativePath);

  routesExportsNames.forEach((exportsName) => {
    if (!(exportsName in routesImport)) {
      const routesFileAbsolutePath = resolve(currentDir(), routesFileRelativePath);

      throw Error(
        `${routesFileAbsolutePath} must export a ${exportsName} property`,
      );
    }
  });

  apiRouter.use(
    routesImport[RoutesExportsNames.PATH],
    routesImport[RoutesExportsNames.ROUTER],
  );
});
