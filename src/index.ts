import "reflect-metadata";
import "../dotenv";

import { server } from "./infra/server";
import { dataSource } from "./infra/dataSource";
import { port } from "./config/app";

await dataSource.initialize();

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
