import { createAuthUserUseCase } from "../../../Containers/AuthUser/CreateAuthUser";
import { CreateAuthUserQueue } from "./CreateAuthUserQueue";

const createAuthUserQueue = new CreateAuthUserQueue(createAuthUserUseCase);
export { createAuthUserQueue };
