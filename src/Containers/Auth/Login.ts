import { LoginController } from "../../Controllers/Auth/LoginController";
import { LoginUseCase } from "../../Presentation/Auth/LoginUseCase";
import { AuthRepository } from "../../Repositories/Auth/auth.repository";
import { AuthUserRepository } from "../../Repositories/AuthUser/auth.user.repository";
import { ComparePassword } from "../../Utils/ComparePassword";
import { GenerateToken } from "../../Utils/GenerateToken";

const generateToken = new GenerateToken();
const authUserRepository = new AuthUserRepository();
const comparePassword = new ComparePassword();
const authRepository = new AuthRepository();
const loginUseCase = new LoginUseCase(
  authRepository,
  authUserRepository,
  generateToken,
  comparePassword
);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
