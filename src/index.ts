import "reflect-metadata";
import "../scripts/dotenv";

// import { dataSource } from "./infra/dataSource";
import { server } from "./infra/server";
import { port } from "./config/app";
import { log } from "./helpers/logger";
import { prisma } from "./infra/prisma";

// await dataSource.initialize();
// log.info("DataSource initialized");

async function main() {
  server.listen(port, () => {
    log.info(`App is running on port ${port}`);
  });
}

main().catch(async (reason) => {
  log.error(reason);
  await prisma.$disconnect();
  process.exit(1);
});
