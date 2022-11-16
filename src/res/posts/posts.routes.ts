import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { createPostSchema } from "./posts.validations";
import { getPostsHandler, createPostHandler } from "./posts.controller";

export const path = "/posts";
export const router = Router();

router.post("/", validateResource(createPostSchema), createPostHandler);

/**
 * I want to be able to send a req url of form:
 * /api/posts?populate=author&page=2&limit=3
 */
router.get("/", getPostsHandler);
