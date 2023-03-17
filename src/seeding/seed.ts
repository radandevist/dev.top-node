import "../../scripts/dotenv";

import { prisma } from "../infra/prisma";
import { log } from "../helpers/logger";

import { run } from "./main.seeder";

const runConfig = {
  usersNum: 5,
  postsNum: 17,
  reactionsNum: 34,
};

run(prisma, runConfig).catch(async (reason) => {
  log.error(reason);
  await prisma.$disconnect();
  process.exit(1);
});
