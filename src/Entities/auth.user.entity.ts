import "reflect-metadata";
import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("auth_users")
class AuthUsers {
  @PrimaryColumn()
  _id?: string;

  @Column()
  first_name?: string;

  @Column()
  last_name?: string;

  @Column()
  dealership_name?: string;

  @Column()
  email: string;

  @Column()
  active: boolean;


  @Column()
  type: string;

  @Column()
  user_id: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date | string;

  @DeleteDateColumn()
  deleted_at?: Date | string;

  constructor() {
    if (!this._id) {
      this._id = uuid();
    }
  }
}

export { AuthUsers };
