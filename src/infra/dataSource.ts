import { resources } from '../constants/resources';
import { isProd } from './../config/environment';
import { host, port, username, password, database } from "../config/db"
import { DataSource } from "typeorm"

const entities = await Promise.all(resources.map(async (resource) => {
  const entityExportName = resource.split("")
    .map((value, index, array) => {
      if (index === 0) return value.toUpperCase()
      if (index === array.length - 1 && value === "s") return ""
      return value;
    })
    .join("")

  const entityFileRelativePath = "../res/" + resource + "/" + resource + ".entity"

  const entityImport: Record<string, any> = await import(entityFileRelativePath)

  return entityImport[entityExportName]
}));

export const dataSource = new DataSource({
    type: "mysql",
    host,
    port,
    username,
    password,
    database,
    entities,
    synchronize: !isProd,
})