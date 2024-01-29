import { CreateAuthDbDto } from "../../Data/Auth/CreateAuthDtos";
import { Auth } from "../../Entities/auth.entity";

export interface IAuthRepository {
  create(values: CreateAuthDbDto): Promise<Auth>;
  findByToken(token: string);
  logout(id: string);
  setExpiredTokensFalse(minutes: number);
}
