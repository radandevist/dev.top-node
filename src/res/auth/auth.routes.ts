import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import { registerHandler } from "./auth.controller";
import { registerSchema } from "./auth.validations";

export const path = "/auth";
export const router = Router();

router.post("/register", validateResource(registerSchema), registerHandler);
