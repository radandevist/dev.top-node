import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { getManyPostsSchema } from "./posts.validations";
import { getManyPostsHandler } from "./posts.controller";

export const path = "/posts";
export const router = Router();

// router.post("/", validateResource(createPostSchema), createPostHandler);

router.get("/", validateResource(getManyPostsSchema), getManyPostsHandler);
