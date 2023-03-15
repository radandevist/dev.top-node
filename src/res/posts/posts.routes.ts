import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { getHomePostsSchema } from "./posts.validations";
import { getHomePostsHandler } from "./posts.controller";

export const path = "/posts";
export const router = Router();

// router.post("/", validateResource(createPostSchema), createPostHandler);

// router.get("/", validateResource(getManyPostsSchema), getManyPostsHandler);

router.get("/home", validateResource(getHomePostsSchema), getHomePostsHandler);
