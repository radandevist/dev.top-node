/* eslint-disable no-param-reassign */
import { Prisma } from "@prisma/client";

import { generateRandomString, slugify } from "../../utils/stringUtils";
import { prisma } from "../../infra/prisma";

async function getUniqueSlug(title: any) {
  let slug: any;

  let whileCondition = true;
  do {
    slug = `${slugify(title)}-${generateRandomString(5)}`;
    // eslint-disable-next-line no-await-in-loop
    const foundPost = await prisma.post.findUnique({ where: { slug } });
    whileCondition = !!foundPost;
  } while (whileCondition);

  return slug;
}

export const setPostSlugOnCreate: Prisma.Middleware = async (params, next) => {
  if (params.model === "Post") {
    if (params.action === "create") {
      // eslint-disable-next-line prefer-const
      let { slug, title } = params.args.data;

      if (slug) return next(params);

      params.args.data.slug = await getUniqueSlug(title);

      return next(params);
    }

    if (params.action === "createMany") {
      await Promise.all(params.args.data.map(async (element: any) => {
        // eslint-disable-next-line prefer-const
        let { slug, title } = element;

        if (slug) return;

        element.slug = await getUniqueSlug(title);
      }));

      return next(params);
    }
  }

  return next(params);
};
