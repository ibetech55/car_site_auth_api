import { UpdateAuthUserUseCase } from "../../Presentation/User/UpdateAuthUserUseCase";
import { AuthUserRepository } from "../../Repositories/AuthUser/auth.user.repository";

const repository = new AuthUserRepository();
const updateAuthUserUseCase = new UpdateAuthUserUseCase(repository);

export { updateAuthUserUseCase };