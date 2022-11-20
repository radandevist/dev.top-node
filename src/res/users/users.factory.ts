import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { User } from "./users.entity";

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();

  user.lastName = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();

  user.firstName = faker.name.firstName();
  user.userName = faker.internet.userName();

  return user;
});
