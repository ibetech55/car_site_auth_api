import { Auth } from "../../../Entities/auth.entity";
import { AppError } from "../../../ErrorHandler/AppError";
import { IAuthRepository } from "../../../Repositories/Auth/IAuthRepository";

class LogoutUseCase {
  private _authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this._authRepository = authRepository;
  }

  async execute(token: string) {
    if(!token) {
      throw new AppError('Bad request', 404)
    }
    const authData: Auth = await this._authRepository.findByToken(token);
    if(!authData) {
      throw new AppError('Bad request', 400)
    }

    const data = await this._authRepository.logout(authData._id);

    return data;
  }
}

export { LogoutUseCase };
