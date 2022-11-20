import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  AfterLoad,
} from "typeorm";
import bcrypt from "bcryptjs";

import { Role } from "../../config/roles";
import { generateRandomString } from "../../utils/stringUtils";
import { usersRepository } from "../../infra/dataSource";
import { Post } from "../posts/posts.entity";
import { Comment } from "../comments/comments.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
    id?: string;

  @Column({
    nullable: true,
  })
    firstName?: string;

  @Column()
    lastName!: string;

  @Column({
    unique: true,
  })
    userName?: string;

  @Column({ unique: true })
    email!: string;

  @Column()
    password!: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.SIMPLE_USER,
  })
    role?: Role;

  @OneToMany(() => Post, (post) => post.author)
    posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
    comments?: Comment[];

  @CreateDateColumn()
    createdAt?: Date;

  @UpdateDateColumn()
    updateAt?: Date;

  @BeforeInsert()
  async setUserName() {
    if (this.userName) {
      return;
    }

    let whileCondition = true;
    do {
      this.userName = this.lastName + generateRandomString(5);
      // eslint-disable-next-line no-await-in-loop
      const foundUser = await usersRepository.findOne({ where: { userName: this.userName } });
      whileCondition = !!foundUser;
    } while (whileCondition);
  }

  @BeforeInsert() // TODO: This should be run before update too
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
  }

  async comparePassword(candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.#password || "");
  }

  /**
   * This property is likely to be used only for filtering password
   * after loading an user.
   * the leading # is important because it tells javascript that the
   * property marked is private so won't be parsed and showed in the
   * display response.
   * */
  #password?: string;

  @AfterLoad()
  filterPassword() {
    this.#password = this.password;
    this.password = undefined as unknown as string;
  }
}
