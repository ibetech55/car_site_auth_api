import { CreateAuthUserDbDto } from "../../../Data/AuthUser/CreateAuthUserDto";
import { CreateAuthUserUseCase } from "../../../Presentation/User/CreateAuthUserUseCase";
import { queueConnection } from "../../Connection";
import { REGISTER_AUTH_USER } from "../../types";

class CreateAuthUserQueue {
  private _createUserUseCase: CreateAuthUserUseCase;
  constructor(createUserUseCase: CreateAuthUserUseCase) {
    this._createUserUseCase = createUserUseCase;
  }

  async execute() {
    const { channel } = await queueConnection();
    await channel.assertQueue(REGISTER_AUTH_USER);
    channel.consume(REGISTER_AUTH_USER, async (message) => {
      const messageData: CreateAuthUserDbDto = JSON.parse(
        message.content.toString()
      );
      await this._createUserUseCase.execute({
        email: messageData.email,
        user_id: messageData.user_id,
        active: messageData.active,
        password: messageData.password,
        last_name: messageData.last_name,
        dealership_name: messageData.dealership_name,
        first_name: messageData.first_name,
        type: messageData.type,
      });
      console.log("Data saved: " + REGISTER_AUTH_USER);
      channel.ack(message);
    });
  }
}

export { CreateAuthUserQueue };
