import { CreateAuthUserUseCase } from "../../Presentation/AuthUser/CreateAuthUserUseCase";
import { AuthUserRepository } from "../../Repositories/AuthUser/auth.user.repository";

const authUserRepository = new AuthUserRepository();
const createAuthUserUseCase = new CreateAuthUserUseCase(
  authUserRepository
);

export { createAuthUserUseCase };
