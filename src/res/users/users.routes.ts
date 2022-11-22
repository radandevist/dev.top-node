import { Router } from "express";

import { getUserHandler } from "./users.controller";

export const path = "/users";
export const router = Router();

router.get("/", getUserHandler);
