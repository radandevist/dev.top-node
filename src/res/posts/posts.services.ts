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

/* type FindManyPostsInput = {
  page: number;
  take: number;
}; */

export async function findManyPosts(/* { page, take }: FindManyPostsInput */) {
  // '/posts?' + s
  // const s = qs.stringify({
  //   page: 1,
  //   limit: 10,
  //   populate: [
  //     { relation: "author" },
  //     {
  //       relation: "comments",
  //       page: 1,
  //       limit: 3,
  //       populate: [
  //         { relation: "author" }
  //       ]
  //     }
  //   ]
  // })

  // const skip = (page - 1) * take;

  // const posts = await postsRepository.find({
  //   take,
  //   skip,
  //   relations: {
  //     author: true,
  //     comments: true,
  //   },
  // });
  // const leagueMembers = await connection
  //   .createQueryBuilder(User, "user")
  //   .leftJoin("user.leagues", "league", "league.id = :leagueId"; { leagueId })
  //   .orderBy("user.id")
  //   .skip(..)
  //   .take(..)
  //   .getMany();

  // const posts = postsRepository.createQueryBuilder()
  //   .skip(skip)
  //   .take(take)
  //   // .relation("author")
  //   // .relation("comments");
  //   // .leftJoin()
  //   .innerJoinAndMapMany()
  // return posts;
  return "";
}
