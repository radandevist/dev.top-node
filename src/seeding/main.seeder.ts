import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Post } from "../res/posts/posts.entity";
import { User } from "../res/users/users.entity";
import { Comment } from "../res/comments/comments.entity";
import { getRandomElements } from "../utils/arrayUtils";

export default class MainSeeder implements Seeder {
  // eslint-disable-next-line class-methods-use-this
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const postsRepo = dataSource.getRepository(Post);
    const commentsRepo = dataSource.getRepository(Comment);

    const userFactory = factoryManager.get(User);
    const postsFactory = factoryManager.get(Post);
    const commentsFactory = factoryManager.get(Comment);

    const users = await userFactory.saveMany(7);

    const posts = await Promise.all(
      Array(17)
        .fill("")
        .map(async () => {
          const made = await postsFactory.make({ author: getRandomElements(users)[0] });
          return made;
        }),
    );
    await postsRepo.save(posts);

    const comments = await Promise.all(
      Array(33)
        .fill("")
        .map(async () => {
          const make = await commentsFactory.save({
            author: getRandomElements(users)[0],
            post: getRandomElements(posts)[0],
          });
          return make;
        }),
    );
    await commentsRepo.save(comments);
  }
}
