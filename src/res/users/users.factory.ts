import { User, Role } from "@prisma/client";
import { Faker } from "@faker-js/faker";

export const userFactory = (faker: Faker) => {
  const getBool = faker.datatype.boolean;
  const user = {} as User;

  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // user.userName = faker.datatype.boolean()
  //   ? faker.internet.userName(user.firstName, user.lastName)
  //   : undefined;
  // user.userName = ""; // prism middleware will change this.
  // user.userName = faker.internet.userName(user.firstName, user.lastName);
  user.email = faker.internet.email(user.firstName, user.lastName);
  user.password = "1234567890";
  user.role = Role.AUTHENTICATED;
  user.verified = getBool();
  user.profilePicUrl = getBool() ? faker.internet.avatar() : null;
  // profile related fields
  user.bio = getBool() ? faker.lorem.sentence() : null;
  user.location = getBool() ? faker.address.country() : null;
  user.education = getBool() ? faker.lorem.words() : null;
  user.work = getBool() ? faker.name.jobTitle() : null;
  user.availableFor = getBool() ? faker.lorem.words() : null;

  return user;
};
