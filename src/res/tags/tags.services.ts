import { DEFAULT_QUERY_LIMIT, DEFAULT_QUERY_PAGE } from "../../config/queries";
import { prisma } from "../../infra/prisma";
import { getSkip } from "../../utils/queryUtils";

export type GetManyTagsInput = {
  limit?: number;
  page?: number;
};

export async function findManyTags({
  limit = DEFAULT_QUERY_LIMIT,
  page = DEFAULT_QUERY_PAGE,
}: GetManyTagsInput) {
  const skip = getSkip(page, limit);

  const tagsCount = await prisma.tag.count();

  const tags = await prisma.tag.findMany({
    skip,
    take: limit,
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  return {
    tagsCount,
    count: tags.length,
    tags,
  };
}
