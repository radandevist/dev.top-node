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
