import { QueueListener } from "./QueueListener"
import { createAuthUserQueue } from "./Actions/CreateAuthUserQueue"
import { updateAuthUserQueue } from "./Actions/UpdateAuthUserQueue"

const queue = new QueueListener(createAuthUserQueue, updateAuthUserQueue)
export default queue