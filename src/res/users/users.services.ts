// import { usersRepository } from "../../infra/dataSource";
import { DEFAULT_QUERY_LIMIT, DEFAULT_QUERY_PAGE } from "../../config/queries";
import { prisma } from "../../infra/prisma";
import { getSkip } from "../../utils/queryUtils";

export async function findUserByEmail(email: string) {
  // return usersRepository.findOneBy({ email });
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserByUserName(userName: string) {
  // return usersRepository.findOneBy({ userName });
  return prisma.user.findUnique({ where: { userName } });
}

export async function findUserById(id: string) {
  // return usersRepository.findOneBy({ id });
  return prisma.user.findUnique({ where: { id } });
}

type SearchUsersInput = {
  limit?: number;
  page?: number;
  term: string;
};

export async function searchUsers({
  limit = DEFAULT_QUERY_LIMIT,
  page = DEFAULT_QUERY_PAGE,
  term,
}: SearchUsersInput) {
  const skip = getSkip(page, limit);

  const WHERE_CONDITION = {
    OR: [
      {
        firstName: {
          contains: term,
        },
      },
      {
        lastName: {
          contains: term,
        },
      },
      {
        userName: {
          contains: term,
        },
      },
    ],
  };

  const foundUsers = await prisma.user.findMany({
    skip,
    take: limit,
    where: WHERE_CONDITION,
  });

  const usersCount = await prisma.user.count({ where: WHERE_CONDITION });

  return {
    usersCount,
    count: foundUsers.length,
    users: foundUsers,
  };
}

type GetUserProfileInput = {
  userName: string;
};

export async function getUserProfile({
  userName,
}: GetUserProfileInput) {
  const user = await prisma.user.findUnique({
    where: { userName },
    include: {
      _count: {
        select: {
          posts: true,
          comments: true,
          followedTags: true,
        },
      },
    },
  });

  return { user };
}
