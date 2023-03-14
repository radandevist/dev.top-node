import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import { userFactory } from "../res/users/users.factory";
import { log } from "../helpers/logger";
import { postFactory } from "../res/posts/posts.factory";

export async function run(prismaClient: PrismaClient) {
  const madeUsers = Array.from({ length: 5 }).map(() => userFactory(faker));

  await prismaClient.user.createMany({ data: madeUsers });
  const users = await prismaClient.user.findMany();
  log.info("users seeding done");

  const userIds = users.map((user) => user.id);

  const madePosts = Array.from({ length: 17 }).map(() => {
    const post = postFactory(faker);
    post.userId = faker.helpers.arrayElement(userIds);
    // randomly set a value for now
    // TODO set the dateTime fields to a date after related user's creation
    // if (post.published) post.publishedAt = faker.datatype.datetime();
    // post.publishedAt = faker.datatype.datetime(); // default to now in schema

    return post;
  });

  await prismaClient.post.createMany({ data: madePosts });
  const posts = await prismaClient.post.findMany();
  log.info("post seeding done");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postsIds = posts.map((post) => post.id);
}
