// import { FindOptionsUtils } from "typeorm";
import { Post } from "@prisma/client";

// import { postsRepository, usersRepository } from "../../infra/dataSource";
import { prisma } from "../../infra/prisma";
import { DEFAULT_QUERY_LIMIT, DEFAULT_QUERY_PAGE } from "../../config/queries";
import { getSkip } from "../../utils/queryUtils";

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
};

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
  limit = DEFAULT_QUERY_LIMIT,
  page = DEFAULT_QUERY_PAGE,
}: GetHomePostsInput) {
  // const skip = limit * (page - 1);
  const skip = getSkip(page, limit);

  // const qb = postsRepository.createQueryBuilder("post");
  // example value for populate: ["author", "comments", "comments.author"]
  // eslint-disable-next-line max-len
  // FindOptionsUtils.applyRelationsRecursively(qb, populate, qb.alias, postsRepository.metadata, "");

  // const posts = await qb
  //   .take(limit)
  //   .skip(skip)
  //   .getMany();

  const homePosts = await prisma.post.findMany({
    // TODO: filter where post !== deleted && post === published
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      // reactions: true, // we only want the reactions count prefer '_count' instead
      _count: {
        select: {
          comments: true,
          reactions: true,
        },
      },
      // eslint-disable-next-line max-len
      tags: {
        // take: DEFAULT_QUERY_LIMIT,
        take: 5,
      }, // there will be a limit of 4-5 tags for each posts so it's okay to load theme here
      // comments: {
      //   orderBy: {
      //     createdAt: "desc",
      //   },
      //   include: {
      //     author: true,
      //   },
      // },
    },
  });

  // TODO: filter where post !== deleted && post === published
  const postsCount = await prisma.post.count();

  return {
    // page,
    postsCount,
    count: homePosts.length,
    posts: homePosts,
  };
}

type SearchPostsInput = {
  page?: number;
  limit?: number;
  term: string;
};

export async function searchPosts({
  limit = DEFAULT_QUERY_LIMIT,
  page = DEFAULT_QUERY_PAGE,
  term,
}: SearchPostsInput) {
  const skip = getSkip(page, limit);

  const WHERE_CONDITION = {
    // TODO: filter where post !== deleted && post === published
    title: {
      contains: term,
    },
  };

  const foundPosts = await prisma.post.findMany({
    skip,
    take: limit,
    where: WHERE_CONDITION,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      // reactions: true, // we only want the reactions count prefer '_count' instead
      _count: {
        select: {
          comments: true,
          reactions: true,
        },
      },
      // eslint-disable-next-line max-len
      tags: {
        take: 5,
      }, // there will be a limit of 4-5 tags for each posts so it's okay to load theme here
      // comments: {
      //   orderBy: {
      //     createdAt: "desc",
      //   },
      //   include: {
      //     author: true,
      //   },
      // },
    },
  });

  const postsCount = await prisma.post.count({ where: WHERE_CONDITION });

  return {
    postsCount,
    count: foundPosts.length,
    posts: foundPosts,
  };
}
