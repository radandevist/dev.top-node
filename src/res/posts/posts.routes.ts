import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { getHomePostsSchema, searchPostsSchema, getUserProfilePostsSchema } from "./posts.validations";
import { getHomePostsHandler, getSearchPostsHandler, getUserProfilePostsHandler } from "./posts.controller";

export const path = "/posts";
export const router = Router();

// router.post("/", validateResource(createPostSchema), createPostHandler);

// router.get("/", validateResource(getManyPostsSchema), getManyPostsHandler);

router.get("/home", validateResource(getHomePostsSchema), getHomePostsHandler);

router.get<string, any, any, any, any>("/search", validateResource(searchPostsSchema), getSearchPostsHandler);

router.get("/profile/:userName", validateResource(getUserProfilePostsSchema), getUserProfilePostsHandler);
