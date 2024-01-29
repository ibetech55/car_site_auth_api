import { SetExpiredTokensFalseUseCase } from "../Presentation/Auth/SetExpiredTokensFalseUseCase/SetExpiredTokensFalse";
import { AuthRepository } from "../Repositories/Auth/auth.repository";
import { Bots } from "./Bots";

const repository = new AuthRepository();
const setExpiredTokensFalseUseCase = new SetExpiredTokensFalseUseCase(repository);
const bots = new Bots(setExpiredTokensFalseUseCase);

export { bots };
