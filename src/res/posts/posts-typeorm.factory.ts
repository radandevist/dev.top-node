import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { Post } from "./posts.entity";

export const PostsFactory = setSeederFactory(Post, (faker: Faker) => {
  const post = new Post();

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
