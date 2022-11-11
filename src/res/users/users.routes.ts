import { Router } from "express";

import { createUser } from "./users.controller";

export const path = "/users";

export const router = Router();

router.post("/", createUser);
