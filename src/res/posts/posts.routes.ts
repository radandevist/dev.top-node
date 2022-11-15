import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { createPostSchema } from "./posts.validations";
import { getPostsHandler, createPostHandler } from "./posts.controller";

export const path = "/posts";
export const router = Router();

router.post("/", validateResource(createPostSchema), createPostHandler);

router.get("/", getPostsHandler);
