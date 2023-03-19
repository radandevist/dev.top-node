import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { getHomePostsSchema, searchPostsSchema } from "./posts.validations";
import { getHomePostsHandler, getSearchPostsHandler } from "./posts.controller";

export const path = "/posts";
export const router = Router();

// router.post("/", validateResource(createPostSchema), createPostHandler);

// router.get("/", validateResource(getManyPostsSchema), getManyPostsHandler);

router.get("/home", validateResource(getHomePostsSchema), getHomePostsHandler);

router.get<string, any, any, any, any>("/search", validateResource(searchPostsSchema), getSearchPostsHandler);
