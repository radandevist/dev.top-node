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

type FindUserProfilePostsInput = {
  limit?: number;
  page?: number;
  userName: string;
};

export async function findUserProfilePosts({
  limit = DEFAULT_QUERY_LIMIT,
  page = DEFAULT_QUERY_PAGE,
  userName,
}: FindUserProfilePostsInput) {
  const skip = getSkip(page, limit);

  const WHERE_CONDITION = {
    // TODO: filter where post !== deleted && post === published
    author: {
      userName,
    },
  };

  const foundPosts = await prisma.post.findMany({
    skip,
    take: limit,
    where: WHERE_CONDITION,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      // reactions: true, // we only want the reactions count prefer '_count' instead
      _count: {
        select: {
          comments: true,
          reactions: true,
        },
      },
      // eslint-disable-next-line max-len
      tags: {
        take: 5,
      }, // there will be a limit of 4-5 tags for each posts so it's okay to load theme here
      // comments: {
      //   orderBy: {
      //     createdAt: "desc",
      //   },
      //   include: {
      //     author: true,
      //   },
      // },
    },
  });

  const postsCount = await prisma.post.count({ where: WHERE_CONDITION });

  return {
    postsCount,
    count: foundPosts.length,
    posts: foundPosts,
  };
}
