import { CreateAuthUserDbDto } from "../../../Data/AuthUser/CreateAuthUserDto";
import { IAuthUserRepository } from "../../../Repositories/AuthUser/IAuthUserRepository";

class CreateAuthUserUseCase {
  private _userRepository: IAuthUserRepository;
  constructor(userRepository: IAuthUserRepository) {
    this._userRepository = userRepository;
  }

  async execute(values: CreateAuthUserDbDto) {
    const data = await this._userRepository.create({
      ...values,
      active: false,
    });
    return data;
  }
}

export { CreateAuthUserUseCase };
