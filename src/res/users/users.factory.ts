import { User, Role } from "@prisma/client";
import { Faker } from "@faker-js/faker";

export const userFactory = (faker: Faker) => {
  const user = {} as User;

  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.userName = faker.internet.userName(user.firstName, user.lastName);
  user.email = faker.internet.email(user.firstName, user.lastName);
  user.password = "1234567890";
  user.role = Role.AUTHENTICATED;
  user.verified = faker.datatype.boolean();
  user.profilePicUrl = faker.internet.avatar();

  return user;
};
