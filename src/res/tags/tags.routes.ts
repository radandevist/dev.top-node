import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { getManyTagsSchema, searchTagsSchema } from "./tags.validations";
import { getManyTagsHandler, searchTagsHandler } from "./tags.controller";

export const path = "/tags";
export const router = Router();

router.get("/", validateResource(getManyTagsSchema), getManyTagsHandler);

router.get<string, any, any, any, any>("/search", validateResource(searchTagsSchema), searchTagsHandler);
