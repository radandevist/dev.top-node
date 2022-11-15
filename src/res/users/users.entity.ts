import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";

import { Role } from "../../config/roles";
import { generateRandomString } from "../../utils/stringUtils";
import { usersRepository } from "../../infra/dataSource";
import { Post } from "../posts/posts.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

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
    role!: Role;

  @OneToMany(() => Post, (post) => post.author)
    posts!: Post[];

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updateAt!: Date;

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
    return bcrypt.compare(candidatePassword, this.password);
  }
}
