import { CreateAuthUserDbDto } from "../../Data/AuthUser/CreateAuthUserDto";
import { UpdateAuthUserDbDto } from "../../Data/AuthUser/UpdateUserDto";

export interface IAuthUserRepository {
  create(values:CreateAuthUserDbDto);
  getByEmail(email:string);
  getByUserId(id:string);
  update(id: string, values:UpdateAuthUserDbDto);
}
