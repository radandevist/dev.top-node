import typeorm, {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  // Relation,
  // ManyToMany,
  // JoinTable,
} from "typeorm";

import { generateRandomString, slugify } from "../../utils/stringUtils";
// import { User } from "../../infra/entities";
import { postsRepository } from "../../infra/dataSource";
import { User } from "../users/users.entity";
import { Comment } from "../comments/comments.entity";

// import { postsRepository } from "./posts.repository";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column()
    title!: string;

  @Column({ type: "longtext" })
    content!: string;

  @Column({ default: false })
    published!: boolean;

  @ManyToOne(() => User, (user) => user.posts)
    author!: typeorm.Relation<User>;

  // @OneToMany(() => Reaction, (reaction) => reaction.post)
  //   reactions!: Reaction[];

  @OneToMany(() => Comment, (comment) => comment.post)
    comments!: Comment[];

  @Column({ default: false })
    pinned!: boolean;

  @Column({ nullable: true })
    coverImage?: string;

  @Column()
    slug!: string; // Basically, a slug of the title

  // @ManyToMany(() => Tag)
  // @JoinTable()
  //   tags!: Tag[];

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  @Column({
    type: "boolean",
    default: false,
  })
    deleted!: boolean;

  @BeforeInsert()
  async setSlug() {
    if (this.slug) {
      return;
    }

    let whileCondition = true;
    do {
      this.slug = slugify(`${this.title} ${generateRandomString(5)}`);
      // eslint-disable-next-line no-await-in-loop
      const foundPost = await postsRepository.findOne({ where: { slug: this.slug } });
      whileCondition = !!foundPost;
    } while (whileCondition);
  }
}
