import { Tag } from "@prisma/client";
import { Faker } from "@faker-js/faker";

export const tagFactory = (faker: Faker) => {
  const tag = {} as Tag;

  tag.color = faker.color.rgb();

  return tag;
};
