import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { createPostSchema, getManyPostsSchema } from "./posts.validations";
import { getManyPostsHandler, createPostHandler } from "./posts.controller";

export const path = "/posts";
export const router = Router();

router.post("/", validateResource(createPostSchema), createPostHandler);

router.get("/", validateResource(getManyPostsSchema), getManyPostsHandler);
