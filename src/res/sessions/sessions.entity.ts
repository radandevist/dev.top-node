import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import typeorm, {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { jwt as jwtConfig } from "../../config/jwt";
import { User } from "../users/users.entity";

export type RefreshTokenPayload = {
  userId: string;
  sessionId: string;
};

@Entity()
export class Session {
  @PrimaryColumn("uuid")
    id!: string;

  @Column({ length: 350 })
    token!: string;

  @Column()
    userAgent!: string;

  @Column()
    IPAddress!: string;

  @ManyToOne(() => User, (user) => user.sessions)
    user!: typeorm.Relation<User>;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  @BeforeInsert()
  createToken() {
    if (!this.id) this.id = v4();
    const { secret, lifeTime } = jwtConfig.refreshToken;
    const payload: RefreshTokenPayload = { userId: this.user.id, sessionId: this.id };
    this.token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: lifeTime });
  }
}
