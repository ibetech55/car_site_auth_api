import { DateTime } from "luxon";
import { LoginDto } from "../../../Data/Auth/LoginDtos";
import { AuthUsers } from "../../../Entities/auth.user.entity";
import { AppError } from "../../../ErrorHandler/AppError";
import { IAuthRepository } from "../../../Repositories/Auth/IAuthRepository";
import { IAuthUserRepository } from "../../../Repositories/AuthUser/IAuthUserRepository";
import { ComparePassword } from "../../../Utils/ComparePassword";
import { GenerateToken } from "../../../Utils/GenerateToken";
import { verifyToken } from "../../../Utils/VerifyToken";
class LoginUseCase {
  private readonly _authRepository: IAuthRepository;
  private readonly _authUserRepository: IAuthUserRepository;
  private readonly _generateToken: GenerateToken;
  private readonly _comparePassword: ComparePassword;

  constructor(
    authRepository: IAuthRepository,
    authUserRepository: IAuthUserRepository,
    generateToken: GenerateToken,
    comparePassword: ComparePassword
  ) {
    this._authRepository = authRepository;
    this._authUserRepository = authUserRepository;
    this._generateToken = generateToken;
    this._comparePassword = comparePassword;
  }

  async execute(values: LoginDto) {
    const userData: AuthUsers = await this._authUserRepository.getByEmail(
      values.email
    );

    const comparePassword = this._comparePassword.execute(
      values.password,
      userData.password
    );

    if (!comparePassword) {
      throw new AppError("Incorrect email or password", 400);
    }

    const [token, loginToken] = await Promise.all([
      this._generateToken.authToken({
        user_id: userData.user_id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        type: userData.type,
      }),
      this._generateToken.loginToken({
        user_id: userData.user_id,
      }),
    ]);

    const tokenData = verifyToken(token, loginToken);

    const authData = await this._authRepository.create({
      auth_user_id: userData._id,
      token,
      exp_time: DateTime.fromSeconds(tokenData.token.exp)
        .setZone("America/Sao_Paulo")
        .toJSDate(),
      login_token: loginToken,
      active: true,
    });

    return { login_token: authData.login_token, auth_token: authData.token };
  }
}

export { LoginUseCase };
