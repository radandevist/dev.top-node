import { User } from "../users/users.entity";
import { usersRepository } from "../users/users.repository";

export type RegisterInput = Omit<
User,
"id" | "role" | "createdAt" | "updateAt" | "setUserName" | "hashPassword" | "comparePassword"
>;

export async function registerUser(input: RegisterInput) {
  return usersRepository.save(usersRepository.create(input));
}
