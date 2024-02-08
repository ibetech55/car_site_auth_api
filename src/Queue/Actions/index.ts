import { ConsumeMessage } from "amqplib";
import { REGISTER_AUTH_USER, USER_API_UPDATE_AUTH_USER } from "../types";
import { createAuthUserUseCase } from "../../Containers/AuthUser/CreateAuthUser";
import { rabbitMq } from "..";
import { updateAuthUserUseCase } from "../../Containers/AuthUser/UpdateAuthUser";

export const createAuthUserQueue = async (msg: ConsumeMessage) => {
    await createAuthUserUseCase.execute(JSON.parse(msg.content.toString()));
    console.log(`${REGISTER_AUTH_USER} - ${new Date()}`);
    rabbitMq.subChannel.ack(msg)
}

export const updateAuthUserQueue = async (msg: ConsumeMessage) => {
    await updateAuthUserUseCase.execute(JSON.parse(msg.content.toString()));
    console.log(`${USER_API_UPDATE_AUTH_USER} - ${new Date()}`);
    rabbitMq.subChannel.ack(msg)
}
