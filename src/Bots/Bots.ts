import nodeCron from "node-cron";
import { SetExpiredTokensFalseUseCase } from "../Presentation/Auth/SetExpiredTokensFalseUseCase/SetExpiredTokensFalse";

class Bots {
  private readonly _setExpiredTokensFalseUseCase: SetExpiredTokensFalseUseCase;
  constructor(setExpiredTokensFalseUseCase: SetExpiredTokensFalseUseCase) {
    this._setExpiredTokensFalseUseCase = setExpiredTokensFalseUseCase;
  }

  private setExpiredTokensFalse = async () => {
    await this._setExpiredTokensFalseUseCase.execute();
    console.log("Set Expired Token False bot finished");
  };

  execute() {
    nodeCron.schedule('0 1 * * *', this.setExpiredTokensFalse);
    nodeCron.schedule("0 12 * * *", this.setExpiredTokensFalse);
    nodeCron.schedule("0 18 * * *", this.setExpiredTokensFalse);
  }
}

export { Bots };
