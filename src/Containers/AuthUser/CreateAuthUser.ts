import { CreateAuthUserUseCase } from "../../Presentation/User/CreateAuthUserUseCase";
import { AuthUserRepository } from "../../Repositories/AuthUser/auth.user.repository";

const repository = new AuthUserRepository();
const createAuthUserUseCase = new CreateAuthUserUseCase(repository);

export { createAuthUserUseCase };
