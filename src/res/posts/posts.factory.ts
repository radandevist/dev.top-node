import { Post } from "@prisma/client";
import { Faker } from "@faker-js/faker";

export const postFactory = (faker: Faker) => {
  const post = {} as Post;

  post.title = faker.lorem.sentence();
  post.subtitle = faker.lorem.sentence();
  post.content = faker.lorem.paragraphs(1);
  post.coverImageUrl = faker.image.imageUrl();
  post.slug = faker.helpers.slugify(post.title);
  post.deleted = faker.datatype.boolean();
  post.pinned = faker.datatype.boolean();
  post.published = faker.datatype.boolean();

  return post;
};
