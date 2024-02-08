import { UpdateAuthUserDto } from "../../../Data/AuthUser/UpdateUserDto";
import { AppError } from "../../../ErrorHandler/AppError";
import { IAuthUserRepository } from "../../../Repositories/AuthUser/IAuthUserRepository";

class UpdateAuthUserUseCase {
  private readonly _authUserRepository: IAuthUserRepository;
  constructor(authUserRepository: IAuthUserRepository) {
    this._authUserRepository = authUserRepository;
  }

  async execute(values: UpdateAuthUserDto) {
    const updateValues: UpdateAuthUserDto = {
      ...values,
    };
    delete updateValues.user_id;

    const authUserData = await this._authUserRepository.getByUserId(
      values.user_id
    );
    if (!authUserData) {
      throw new AppError("Bad Request", 400);
    }
    const data = await this._authUserRepository.update(
      authUserData._id,
      updateValues
    );
    return data;
  }
}

export { UpdateAuthUserUseCase };
