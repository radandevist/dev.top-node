import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { searchUsersHandler, getUserHandler, getUserProfileHandler } from "./users.controller";
import { getUserProfileSchema, searchUsersSchema } from "./users.validations";

export const path = "/users";
export const router = Router();

router.get("/", getUserHandler); // this handler does nothing interesting for now

router.get<string, any, any, any, any>("/search", validateResource(searchUsersSchema), searchUsersHandler);

router.get("/profile/:userName", validateResource(getUserProfileSchema), getUserProfileHandler);
