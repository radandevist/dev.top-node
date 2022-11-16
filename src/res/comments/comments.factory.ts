import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
// import { define } from "typeorm-seeding";

import { Comment } from "./comments.entity";

export const CommentsFactory = setSeederFactory(Comment, (faker: Faker) => {
  const comment = new Comment();

  comment.text = faker.lorem.sentence();

  return comment;
});
