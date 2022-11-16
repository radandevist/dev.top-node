// import { join } from "path";
// import { existsSync } from "fs";

import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
// import { z } from "zod";

import { isProd } from "../config/environment";
import {
  host, port, username, password, database,
} from "../config/db";
import { Post } from "../res/posts/posts.entity";
import { User } from "../res/users/users.entity";
import { Comment } from "../res/comments/comments.entity";
import MainSeeder from "../seeding/main.seeder";
import { UsersFactory } from "../res/users/users.factory";
import { PostsFactory } from "../res/posts/posts.factory";
import { CommentsFactory } from "../res/comments/comments.factory";
// import { capitalize, toSingular } from "../utils/stringUtils";
// import { resources, resourcesDir } from "../constants/resources";

// ================================================= //
//          USE MANUALLY IMPORTED ENTITIES           //
// ================================================= //

const entities = [User, Post, Comment];

// ================================================= //
//          DYNAMIC IMPORTS OF ENTITIES              //
// ================================================= //

// const entityClassSchema = (
//   entityModuleName: string,
//   entityClassName: string,
// ) => z.function(z.tuple([]).rest(z.any()), z.unknown(), {
//   required_error: `The module '${entityModuleName}' must export
//   an entity class named '${entityClassName}'`,
//   invalid_type_error: `The exported member '${entityClassName}'
//    in '${entityModuleName}' must be a class`,
// });

// const entityModuleSchema = (entityModuleName: string, entityClassName: string) => z.object({
//   [entityClassName]: entityClassSchema(entityModuleName, entityClassName),
// });

// const entities = (await Promise.all(
//   resources.map(async (resource) => {
//     const entityClassName = capitalize(toSingular(resource));
//     const entityModuleName = `${resource}.entity`;
//     const entityModulePath = join(resourcesDir, resource, entityModuleName);

//     if (!existsSync(`${entityModulePath}.js`)) return null;

//     const entityModule = entityModuleSchema(entityModuleName, entityClassName)
//       .parse(await import(entityModulePath));

//     return entityModule[entityClassName];
//   }),
// )).filter<z.infer<ReturnType<typeof entityClassSchema>>>(Boolean as any);

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host,
  port,
  username,
  password,
  database,
  entities,
  synchronize: !isProd,
  seeds: [MainSeeder],
  factories: [UsersFactory, PostsFactory, CommentsFactory],
};

export const dataSource = new DataSource(options);

// ================================================= //
//                   REPOSITORIES                    //
// ================================================= //

/**
 * Repositories must be defined just after the dataSource definition
 * in the same file. Otherwise node will throw:
 *  ReferenceError: Cannot access 'dataSource' before initialization
 */

export const usersRepository = dataSource.getRepository(User);
export const postsRepository = dataSource.getRepository(Post);
export const commentsRepository = dataSource.getRepository(Comment);
