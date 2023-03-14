// import { usersRepository } from "../../infra/dataSource";
import { prisma } from "../../infra/prisma";

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
