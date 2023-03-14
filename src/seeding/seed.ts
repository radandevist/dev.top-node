import "../../scripts/dotenv";

import { PrismaClient } from "@prisma/client";

import { prisma } from "../infra/prisma";
import { log } from "../helpers/logger";

import { run } from "./main.seeder";

const prismaClient = new PrismaClient();

try {
  run(prismaClient);
} catch (error) {
  log.error(error);
  prisma.$disconnect();
  process.exit(1);
}
