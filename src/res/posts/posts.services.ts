import { FindOptionsUtils } from "typeorm";

import { postsRepository, usersRepository } from "../../infra/dataSource";

import { Post } from "./posts.entity";

export type CreatePostInput = Pick<
Post,
"title" | "content" | "slug" | "coverImage" | "pinned"
> & {
  authorId: string;
};

export async function createPost(input: CreatePostInput) {
  const { authorId, ...postParams } = input;
  const author = usersRepository.create({ id: authorId });
  const post = postsRepository.create({ ...postParams, author });
  return postsRepository.save(post);
}

type FindManyPostsInput = {
  page?: number;
  limit?: number;
  populate?: string[];
};

const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 1;

export async function findManyPosts({
  limit = DEFAULT_LIMIT,
  page = DEFAULT_PAGE,
  populate = [],
}: FindManyPostsInput) {
  const skip = limit * (page - 1);

  const qb = postsRepository.createQueryBuilder("post");
  // example value for populate: ["author", "comments", "comments.author"]
  FindOptionsUtils.applyRelationsRecursively(qb, populate, qb.alias, postsRepository.metadata, "");

  const posts = await qb
    .take(limit)
    .skip(skip)
    .getMany();

  return { count: limit, page, posts };
}
