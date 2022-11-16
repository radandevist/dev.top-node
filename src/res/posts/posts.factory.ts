import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
// import { define } from "typeorm-seeding";

import { Post } from "./posts.entity";

export const PostsFactory = setSeederFactory(Post, (faker: Faker) => {
  const post = new Post();

  // const images = [
  //   faker.image.abstract(),
  //   faker.image.animals(),
  //   faker.image.business(),
  //   faker.image.cats(),
  //   faker.image.city(),
  //   faker.image.fashion(),
  // ]

  // mandatory fields
  post.title = faker.lorem.sentence();
  post.content = faker.lorem.sentence();
  // post.author

  // not mandatory
  post.published = faker.datatype.boolean();
  post.pinned = faker.datatype.boolean();
  post.coverImage = faker.image.image();
  post.slug = faker.helpers.slugify(post.title);

  return post;
});
