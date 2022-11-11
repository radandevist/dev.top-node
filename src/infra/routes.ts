import { currentDir, getDirectories } from './../utils/fsUtils'
import { Router } from "express"
import { resolve } from "path"

enum RoutesExportsNames {
  PATH = 'path',
  ROUTER = 'router'
}
const routesExportsNames = Object.values(RoutesExportsNames)

export const apiRouter = Router()

const resources = getDirectories("../res")

resources.map(async (resource) => {
  const routesFileRelativePath = "../res/" + resource + "/" + resource + ".routes";

  const routesImport: Record<string, any> = await import(routesFileRelativePath)  

  routesExportsNames.forEach((exportsName) => {
    if (!(exportsName in routesImport)) {
      const routesFileAbsolutePath = resolve(currentDir(), routesFileRelativePath)
      throw Error(routesFileAbsolutePath + " must export a " + exportsName + " property")
    }
  })

  apiRouter.use(routesImport[RoutesExportsNames.PATH], routesImport[RoutesExportsNames.ROUTER])
})