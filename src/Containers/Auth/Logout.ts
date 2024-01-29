import { LogoutController } from "../../Controllers/Auth/LogoutController";
import { LogoutUseCase } from "../../Presentation/Auth/LogoutUseCase";
import { AuthRepository } from "../../Repositories/Auth/auth.repository";


const authRepository = new AuthRepository();
const logoutUseCase = new LogoutUseCase(
  authRepository
);
const logoutController = new LogoutController(logoutUseCase);

export { logoutUseCase, logoutController };
