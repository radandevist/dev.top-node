import { User } from "../users/users.entity";
import { usersRepository } from "../../infra/dataSource";

export type RegisterInput = Pick<User, "email" | "password" | "lastName" | "userName" | "firstName">;

export async function registerUser(input: RegisterInput) {
  return usersRepository.save(usersRepository.create(input));
}
