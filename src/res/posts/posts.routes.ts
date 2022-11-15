import { Router } from "express";

import { getPostsHandler } from "./posts.controller";

export const path = "/posts";
export const router = Router();

router.get("/", getPostsHandler);
