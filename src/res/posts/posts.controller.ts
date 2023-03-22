import { Request, Response, NextFunction } from "express";

import { ok } from "../../helpers/responseFormatter";

import { getHomePostsList, searchPosts } from "./posts.services";
import { GetHomePostsQuery, SearchPostsQuery } from "./posts.validations";

// export async function getManyPostsHandler(req: Request, res: Response) {
//   try {
//     log.info("parsed query", req.query);

//     const posts = await findManyPosts(req.query);
//     log.info("posts", posts);
//     res.send(ok(posts));
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

export async function getHomePostsHandler(
  req: Request<EmptyObj, EmptyObj, EmptyObj, GetHomePostsQuery>,
  res: Response,
  next: NextFunction,
) {
  try {
    // const a = req.query.limit;
    const result = await getHomePostsList(req.query);
    res.status(200).send(ok(result));
  } catch (error) {
    next(error);
  }
}

export async function searchPostsHandler(
  req: Request<EmptyObj, EmptyObj, EmptyObj, SearchPostsQuery>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await searchPosts(req.query);
    res.status(200).send(ok(result));
  } catch (error) {
    next(error);
  }
}

// export async function createPostHandler(
//   req: Request<AnyObj, AnyObj, CreatePostBody>,
//   res: Response,
// ) {
//   try {
//     // req.userPayload = { }
//     const post = await createPost({
//  ..req.body, authorId: "18b7a072-b07d-4d5c-95bf-c9625be65c98" });
//     log.info("post created", post);
//     return res.status(200).send(ok(post));
//   } catch (error) {
//     log.error(error);
//     return res.status(500).send(error);
//   }
// }
