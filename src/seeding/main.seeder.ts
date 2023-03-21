import { faker } from "@faker-js/faker";
import { Post, PrismaClient } from "@prisma/client";

import { userFactory } from "../res/users/users.factory";
import { log } from "../helpers/logger";
import { postFactory } from "../res/posts/posts.factory";
import { reactionFactory } from "../res/reactions/reactions.factory";
import { tagFactory } from "../res/tags/tags.factory";

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

  // set the UserFollows relation
  await Promise.all(userIds.map(async (userId) => {
    const filteredIds = userIds.filter((id) => id !== userId);
    await prismaClient.user.update({
      where: { id: userId },
      data: {
        followers: {
          connect: faker.helpers.arrayElements(filteredIds.map((id) => ({ id }))),
        },
      },
    });
  }));

  // =================== POSTS =======================//
  const madePosts = Array.from({ length: postsNum }).map(() => {
    const post = postFactory(faker) as Post & { tags: any };
    post.userId = faker.helpers.arrayElement(userIds);
    // randomly set a value for now
    // TODO set the dateTime fields to a date after related user's creation
    // if (post.published) post.publishedAt = faker.datatype.datetime();
    // post.publishedAt = faker.datatype.datetime(); // default to now in schema

    // // ! connect to existing tags
    // post.tags = {
    //   connect: faker.helpers.arrayElements(tagIds.map((id) => ({ id }))).slice(0, 4),
    // };

    return post;
  });

  await prismaClient.post.createMany({ data: madePosts });
  const posts = await prismaClient.post.findMany();
  log.info("post seeding done");

  const postsIds = posts.map((post) => post.id);

  // ==================== COMMENTS (ON POSTS) =======================//

  // =================== REACTIONS (TO POSTS) =======================//
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

  // =================== TAGS =======================//
  // for ensuring that tag names are unique we use the hardcoded array below
  // const tagNames = ["React", "Prisma", "Midlleware", "General Coding", "HTML"];
  const tagNames = [...new Set(faker.lorem.words(10).split(" "))];

  const madeTags = tagNames.map((name) => {
    const tag = tagFactory(faker);
    tag.name = name;
    return tag;
  });

  // await prismaClient.tag.createMany({ data: madeTags });
  await Promise.all(madeTags.map(async (tag) => {
    await prismaClient.tag.create({
      data: {
        ...tag,
        posts: {
          connect: faker.helpers.arrayElements(postsIds.map((id) => ({ id }))),
        },
        followers: {
          connect: faker.helpers.arrayElements(userIds.map((id) => ({ id }))),
        },
      },
    });
  }));
  const tags = await prismaClient.tag.findMany();
  log.info("tags seeding done");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tagIds = tags.map((post) => post.id);

  // prismaClient.post.create({ data: { tags: { connect: [{id: 'fef'}, {}] } } });
}
