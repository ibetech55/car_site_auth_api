import { UpdateAuthUserUseCase } from "../../Presentation/AuthUser/UpdateAuthUserUseCase";
import { AuthUserRepository } from "../../Repositories/AuthUser/auth.user.repository";

const repository = new AuthUserRepository();
const updateAuthUserUseCase = new UpdateAuthUserUseCase(repository);

export { updateAuthUserUseCase };