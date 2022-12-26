import { Router } from "express";

import { validateResource } from "../../middlewares/validateResource";

import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.validations";

export const path = "/auth";
export const router = Router();

router.post("/register", validateResource(registerSchema), registerHandler);

router.post("/login", validateResource(loginSchema), loginHandler);

router.post("/refresh", refreshHandler);

router.post("/logout", logoutHandler);
