import "reflect-metadata"
import "../dotenv"
import { server } from "./infra/server"
import { initializeDataSource } from "./infra/dataSource"

initializeDataSource()

const port = 3300

server.listen(port, function () {
  console.log("App is running on port " + port)
})
