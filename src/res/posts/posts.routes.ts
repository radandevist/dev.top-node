import { Router } from "express";

import { getManyPosts } from "./posts.controller";

export const path = "/posts";

export const router = Router();

router.get("/", getManyPosts);
