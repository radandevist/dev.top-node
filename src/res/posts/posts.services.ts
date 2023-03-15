// import { FindOptionsUtils } from "typeorm";
import { Post } from "@prisma/client";

// import { postsRepository, usersRepository } from "../../infra/dataSource";
import { prisma } from "../../infra/prisma";

// import { Post } from "./posts.entity";

export type CreatePostInput = Pick<
Post,
"title" | "content" | "slug" | "coverImageUrl" | "pinned"
> & {
  authorId: string;
};

export async function createPost(input: CreatePostInput) {
  const { authorId: userId, ...restOfInput } = input;
  // const post = postsRepository.create({ ...postParams, author });
  // return postsRepository.save(post);
  return prisma.post.create({ data: { ...restOfInput, userId } });
}

type GetHomePostsInput = {
  page?: number;
  limit?: number;
  // populate?: string[];
};

const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 1;

// TODO: implement later
// export async function findManyPosts({
//   limit = DEFAULT_LIMIT,
//   page = DEFAULT_PAGE,
//   // populate = [],
// }: FindManyPostsInput) {
//   // const skip = limit * (page - 1);

//   // const qb = postsRepository.createQueryBuilder("post");
//   // example value for populate: ["author", "comments", "comments.author"]
// eslint-disable-next-line max-len, max-len
//   // FindOptionsUtils.applyRelationsRecursively(qb, populate, qb.alias, postsRepository.metadata, "");

//   // const posts = await qb
//   //   .take(limit)
//   //   .skip(skip)
//   //   .getMany();

//   const posts: any[] = [];

//   return { count: limit, page, posts };
// }

/**
 * Specific for the home page, we want to pupulate:
 *  - author of the posts
 *  - comments of each posts
 *  - author of each
 * Something tha is not possible with TypeORM.
 */
export async function getHomePostsList({
  limit = DEFAULT_LIMIT,
  page = DEFAULT_PAGE,
  // populate = [],
}: GetHomePostsInput) {
  const skip = limit * (page - 1);

  // const qb = postsRepository.createQueryBuilder("post");
  // example value for populate: ["author", "comments", "comments.author"]
  // eslint-disable-next-line max-len
  // FindOptionsUtils.applyRelationsRecursively(qb, populate, qb.alias, postsRepository.metadata, "");

  // const posts = await qb
  //   .take(limit)
  //   .skip(skip)
  //   .getMany();

  const homePosts = await prisma.post.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      },
    },
  });

  const count = await prisma.post.count();

  return {
    limit,
    count,
    page,
    posts: homePosts,
  };
}
