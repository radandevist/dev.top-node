import { Reaction, ReactionEnum } from "@prisma/client";
import { Faker } from "@faker-js/faker";

export const reactionFactory = (faker: Faker) => {
  const reaction = {} as Reaction;

  reaction.type = faker.helpers.arrayElement([
    ReactionEnum.BOOKMARK,
    ReactionEnum.LIKE,
    ReactionEnum.UNICORN,
  ]);

  return reaction;
};
