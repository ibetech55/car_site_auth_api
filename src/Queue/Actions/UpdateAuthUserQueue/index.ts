import { updateAuthUserUseCase } from "../../../Containers/AuthUser/UpdateAuthUser";
import { UpdateAuthUserQueue } from "./UpdateAuthUserQueue";

const updateAuthUserQueue = new UpdateAuthUserQueue(updateAuthUserUseCase);
export { updateAuthUserQueue };
