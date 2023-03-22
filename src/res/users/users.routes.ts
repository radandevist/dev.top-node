import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import {
  searchUsersHandler, getUsersHandler, getUserProfileHandler, getUserProfilePostsHandler,
} from "./users.controller";
import { getUserProfilePostsSchema, getUserProfileSchema, searchUsersSchema } from "./users.validations";

export const path = "/users";
export const router = Router();

router.get("/", getUsersHandler); // this handler does nothing interesting for now

router.get<string, any, any, any, any>("/search", validateResource(searchUsersSchema), searchUsersHandler);

router.get("/:userName/profile", validateResource(getUserProfileSchema), getUserProfileHandler);

router.get("/:userName/posts/profile", validateResource(getUserProfilePostsSchema), getUserProfilePostsHandler);
