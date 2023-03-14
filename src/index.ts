import "reflect-metadata";
import "../scripts/dotenv";

import { server } from "./infra/server";
import { dataSource } from "./infra/dataSource";
import { port } from "./config/app";
import { log } from "./helpers/logger";

await dataSource.initialize();
log.info("DataSource initialized");

server.listen(port, () => {
  log.info(`App is running on port ${port}`);
});
