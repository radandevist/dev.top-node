import { Router } from "express";

import { createUserHandler } from "./users.controller";

export const path = "/users";
export const router = Router();

router.post("/", createUserHandler);
