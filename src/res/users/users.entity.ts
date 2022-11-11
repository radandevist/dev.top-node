import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Role } from "../../config/roles";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column()
    firstName?: string;

  @Column()
    lastName!: string;

  @Column({ unique: true })
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

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updateAt!: Date;
}
