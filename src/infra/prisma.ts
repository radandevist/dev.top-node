import { PrismaClient } from "@prisma/client";

import { hashUserPasswordOnCreateAndUpdate, setUserUserNameOnCreate } from "../res/users/users.hooks";
import { setPostSlugOnCreate } from "../res/posts/posts.hooks";

export const prisma = new PrismaClient();

// user
prisma.$use(setUserUserNameOnCreate);
// prisma.$use(hashUserPasswordOnCreateAndUpdate);

// // post
// prisma.$use(setPostSlugOnCreate);
