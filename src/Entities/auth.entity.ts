import "reflect-metadata";
import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("auth")
class Auth {
  @PrimaryColumn()
  _id?: string;

  @Column()
  auth_user_id: string;

  @Column()
  token: string;

  @Column()
  login_token: string;

  @Column()
  exp_time: Date;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if (!this._id) {
      this._id = uuid();
    }
  }
}

export { Auth };
