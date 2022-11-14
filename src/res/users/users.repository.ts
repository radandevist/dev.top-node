import { compare } from "bcryptjs";

import { dataSource } from "../../infra/dataSource";

import { User } from "./users.entity";

export const usersRepository = dataSource.getRepository(User).extend({
  async comparePassword(candidatePassword: string) {
    return compare(candidatePassword, "password");
  },
});

// const a = await usersRepository.findBy({ id: "dsdvsdvsd" });
// a[0].
