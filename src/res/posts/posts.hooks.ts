import { Prisma } from "@prisma/client";

import { generateRandomString, slugify } from "../../utils/stringUtils";
import { prisma } from "../../infra/prisma";

export const setPostSlugOnCreate: Prisma.Middleware = async (params, next) => {
  if (params.model === "Post") {
    if (
      params.action === "create"
      || params.action === "createMany"
    ) {
      // eslint-disable-next-line prefer-const
      let { slug, title } = params.args.data;

      if (slug) {
        await next(params);
        return;
      }

      let whileCondition = true;
      do {
        slug = slugify(`${title} ${generateRandomString(5)}`);
        // const foundPost = await postsRepository.findOne({ where: { slug: this.slug } });
        // eslint-disable-next-line no-await-in-loop
        const foundPost = await prisma.post.findUnique({ where: { slug } });
        whileCondition = !!foundPost;
      } while (whileCondition);
    }
  }
  await next(params);
  // return;
};
