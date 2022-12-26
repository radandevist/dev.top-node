import { Request, Response } from "express";

import { ok } from "../../helpers/responseFormatter";
import { log } from "../../helpers/logger";

import { findManyPosts } from "./posts.services";

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
export async function getManyPostsHandler(req: Request, res: Response) {
  try {
    log.info("parsed query", req.query);

    const posts = await findManyPosts(req.query);
    log.info("posts", posts);
    res.send(ok(posts));
  } catch (error) {
    res.status(500).send(error);
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
