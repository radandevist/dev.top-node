import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import { userFactory } from "../res/users/users.factory";
import { log } from "../helpers/logger";
import { postFactory } from "../res/posts/posts.factory";
import { reactionFactory } from "../res/reactions/reactions.factory";

type RunConfig = {
  usersNum: number;
  postsNum: number;
  reactionsNum: number;
};

export async function run(prismaClient: PrismaClient, {
  usersNum,
  postsNum,
  reactionsNum,
}: RunConfig) {
  // =================== USERS =======================//
  const madeUsers = Array.from({ length: usersNum }).map(() => userFactory(faker));

  await prismaClient.user.createMany({ data: madeUsers });
  const users = await prismaClient.user.findMany();
  log.info("users seeding done");

  const userIds = users.map((user) => user.id);

  // =================== POSTS =======================//
  const madePosts = Array.from({ length: postsNum }).map(() => {
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

  const postsIds = posts.map((post) => post.id);

  // =================== REACTIONS =======================//
  const madeReactions = Array.from({ length: reactionsNum }).map(() => {
    const reaction = reactionFactory(faker);

    reaction.postId = faker.helpers.arrayElement(postsIds);
    // ! there should be only an unique combination of [postId, type, userId]
    // but we don't care for now
    reaction.userId = faker.helpers.arrayElement(userIds);

    return reaction;
  });

  await prismaClient.reaction.createMany({ data: madeReactions });
  const reactions = await prismaClient.reaction.findMany();
  log.info("reactions seeding done");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reactionsIds = reactions.map((reaction) => reaction.id);
}
