import { Router } from "express";

import { router as authRouter } from "../res/auth/auth.routes";
import { router as postsRouter } from "../res/posts/posts.routes";
import { router as usersRouter } from "../res/users/users.routes";
import { router as tagsRouter } from "../res/tags/tags.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/tags", tagsRouter);
