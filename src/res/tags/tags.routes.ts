import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { getManyTagsSchema } from "./tags.validations";
import { getManyTagsHandler } from "./tags.controller";

export const path = "/tags";
export const router = Router();

router.get("/", validateResource(getManyTagsSchema), getManyTagsHandler);
