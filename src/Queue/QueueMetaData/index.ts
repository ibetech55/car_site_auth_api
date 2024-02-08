import { ConsumeMessage } from "amqplib";
import { REGISTER_AUTH_USER, USER_API_UPDATE_AUTH_USER } from "../types";
import { createAuthUserQueue, updateAuthUserQueue } from "../Actions";

const QUEUE_METADATA = [
  {
    name: REGISTER_AUTH_USER,
    handler: (msg: ConsumeMessage) => createAuthUserQueue(msg),
  },
  {
    name: USER_API_UPDATE_AUTH_USER,
    handler: (msg: ConsumeMessage) => updateAuthUserQueue(msg),
  },
];

export { QUEUE_METADATA };
