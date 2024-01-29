import { Repository } from "typeorm";
import { AppDataSource } from "../../Infra/Database/connection";
import { Auth } from "../../Entities/auth.entity";
import { IAuthRepository } from "./IAuthRepository";
import { CreateAuthDbDto } from "../../Data/Auth/CreateAuthDtos";

export class AuthRepository implements IAuthRepository {
  private readonly repository: Repository<Auth>;

  constructor() {
    this.repository = AppDataSource.getRepository<Auth>(Auth);
  }
  async setExpiredTokensFalse(minutes: 30) {
    const query = `
    UPDATE auth
    SET active = false
    WHERE EXTRACT(EPOCH FROM (current_timestamp - auth.exp_time)) / 60 > $1 OR auth.exp_time ISNULL;
  `;  
    await this.repository.query(query, [minutes]);
  }
  async findByToken(token: string) {
    const data = await this.repository.findOneBy({ token });
    return data;
  }
  async logout(id: string) {
    await this.repository.update(id, { active: false });
    return true;
  }
  async create(values: CreateAuthDbDto): Promise<Auth> {
    const newAuth = this.repository.create(values);
    const data = await this.repository.save(newAuth);
    return data;
  }
}
