import {  UpdateAuthUserDto } from "../../../Data/AuthUser/UpdateUserDto";
import { UpdateAuthUserUseCase } from "../../../Presentation/User/UpdateAuthUserUseCase";
import { queueConnection } from "../../Connection";
import { USER_API_UPDATE_AUTH_USER } from "../../types";

class UpdateAuthUserQueue {
  private _updateAuthUserUseCase: UpdateAuthUserUseCase;
  constructor(updateAuthUserUseCase: UpdateAuthUserUseCase) {
    this._updateAuthUserUseCase = updateAuthUserUseCase;
  }

  async execute() {
    const { channel } = await queueConnection();
    await channel.assertQueue(USER_API_UPDATE_AUTH_USER);
    channel.consume(USER_API_UPDATE_AUTH_USER, async (message) => {
      const messageData: UpdateAuthUserDto = JSON.parse(
        message.content.toString()
      );
      await this._updateAuthUserUseCase.execute(messageData);
      console.log("Data saved: " + USER_API_UPDATE_AUTH_USER + ' ' + new Date());
      channel.ack(message);
    });
  }
}

export { UpdateAuthUserQueue };
