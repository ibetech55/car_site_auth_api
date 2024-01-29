import { CreateAuthUserQueue } from "../Actions/CreateAuthUserQueue/CreateAuthUserQueue";
import { UpdateAuthUserQueue } from "../Actions/UpdateAuthUserQueue/UpdateAuthUserQueue";

class QueueListener {
  private readonly _createAuthUserQueue: CreateAuthUserQueue;
  private readonly _updateAuthUserQueue: UpdateAuthUserQueue;

  constructor(
    createAuthUserQueue: CreateAuthUserQueue,
    updateAuthUserQueue: UpdateAuthUserQueue
  ) {
    this._createAuthUserQueue = createAuthUserQueue;
    this._updateAuthUserQueue = updateAuthUserQueue;
  }

  execute() {
    console.log("Connected to que");
    this._createAuthUserQueue.execute();
    this._updateAuthUserQueue.execute();
  }
}

export { QueueListener };
