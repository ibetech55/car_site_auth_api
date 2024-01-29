import { AuthRepository } from "../../../Repositories/Auth/auth.repository";
import { SetExpiredTokensFalseUseCase } from "./SetExpiredTokensFalse";

const repository = new AuthRepository();
const setExpiredTokensFalseUseCase = new SetExpiredTokensFalseUseCase(repository);

export { setExpiredTokensFalseUseCase };
