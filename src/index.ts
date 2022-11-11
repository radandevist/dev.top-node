import { currentDir } from './utils/fsUtils';
import "reflect-metadata"
import "../dotenv"
import { server } from "./infra/server"
// import { initializeDataSource } from "./infra/dataSource"
import { dataSource } from "./infra/dataSource"

// initializeDataSource()
await dataSource.initialize()

const port = 3300

server.listen(port, () => {  
  console.log("App is running on port " + port)
})
