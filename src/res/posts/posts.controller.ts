import { Request, Response } from "express";

import { ok } from "../../helpers/responseFormatter";
import { log } from "../../helpers/logger";

import { createPost } from "./posts.services";
import { CreatePostBody } from "./posts.validations";

export function getPostsHandler(_req: Request, res: Response) {
  res.send("fuck off");
}

export async function createPostHandler(
  req: Request<AnyObj, AnyObj, CreatePostBody>,
  res: Response,
) {
  try {
    // req.userPayload = { }
    const post = await createPost({ ...req.body, authorId: "87286417-4df4-4229-9c5a-6e0575657e2c" });
    log.info("post created", post);
    res.send(ok(post));
  } catch (error) {
    res.send(500).send(error);
  }
}
