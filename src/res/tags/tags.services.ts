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

type SearchTagsInput = {
  limit?: number;
  page?: number;
  term: string;
};

export async function searchTags({
  limit = DEFAULT_QUERY_LIMIT,
  page = DEFAULT_QUERY_PAGE,
  term,
}: SearchTagsInput) {
  const skip = getSkip(page, limit);

  const WHERE_CONDITION = {
    name: {
      contains: term,
    },
  };

  const foundTags = await prisma.tag.findMany({
    skip,
    take: limit,
    where: WHERE_CONDITION,
  });

  const tagsCount = await prisma.tag.count({ where: WHERE_CONDITION });

  return {
    tagsCount,
    count: foundTags.length,
    tags: foundTags,
  };
}
