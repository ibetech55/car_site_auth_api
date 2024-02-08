import { Repository } from "typeorm";
import { AppDataSource } from "../../Infra/Database/connection";
import { IAuthUserRepository } from "./IAuthUserRepository";
import { AuthUsers } from "../../Entities/auth.user.entity";
import { UpdateAuthUserDbDto } from "../../Data/AuthUser/UpdateUserDto";
import { CreateAuthUserDbDto } from "../../Data/AuthUser/CreateAuthUserDto";

export class AuthUserRepository implements IAuthUserRepository {
  private readonly repository: Repository<AuthUsers>;

  constructor() {
    this.repository = AppDataSource.getRepository<AuthUsers>(AuthUsers);
  }
  async update(id: string, values: UpdateAuthUserDbDto) {
    const data = await this.repository.update(id, values);
    return data;
  }
  async create(values: CreateAuthUserDbDto) {
    try {
      const newUser = this.repository.create(values);
      const data = await this.repository.save(newUser);
      return data;
    } catch (error) {
      console.log(error)
    }

  }

  async getByEmail(email: string) {
    const data = await this.repository.findOne({ where: { email } });
    return data;
  }

  async getByUserId(userId: string) {
    const data = await this.repository.findOne({ where: { user_id: userId } });
    return data;
  }
}
