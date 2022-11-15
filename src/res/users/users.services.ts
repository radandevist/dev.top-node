import { usersRepository } from "./users.repository";

export async function findUserByEmail(email: string) {
  return usersRepository.findOneBy({ email });
}

export async function findUserByUserName(userName: string) {
  return usersRepository.findOneBy({ userName });
}
