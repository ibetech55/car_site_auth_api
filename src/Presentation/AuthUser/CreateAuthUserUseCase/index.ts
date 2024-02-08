import { CreateAuthUserDbDto } from "../../../Data/AuthUser/CreateAuthUserDto";
import { IAuthUserRepository } from "../../../Repositories/AuthUser/IAuthUserRepository";

class CreateAuthUserUseCase {
  private readonly _authUserRepository: IAuthUserRepository;

  constructor(authUserRepository: IAuthUserRepository) {
    this._authUserRepository = authUserRepository;
  }

  async execute(values: CreateAuthUserDbDto) {
    const data = await this._authUserRepository.create({
      ...values,
      active: false,
    });
    return data;
  }
}

export { CreateAuthUserUseCase };
