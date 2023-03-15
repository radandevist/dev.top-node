// import typeorm, {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from "typeorm";

// import { Post } from "../posts/posts.entity";
// import { User } from "../users/users.entity";

// @Entity()
// export class Comment {
//   @PrimaryGeneratedColumn("uuid")
//     id!: string;

//   @Column({ type: "longtext" })
//     content!: string;

//   @ManyToOne(() => User, (user) => user.comments)
//     author!: typeorm.Relation<User>;

//   @ManyToOne(() => Post, (post) => post.comments)
//     post!: typeorm.Relation<Post>;

//   @CreateDateColumn()
//     createdAt!: Date;

//   @UpdateDateColumn()
//     updatedAt!: Date;
// }
