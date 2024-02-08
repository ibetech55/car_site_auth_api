import amqplib, { Channel, Connection } from "amqplib";
import { QUEUE_METADATA } from "../QueueMetaData";

export class RabbitMq {
  rabbitMqPub: Connection | null = null;
  rabbitMqSub: Connection | null = null;
  pubChannel: Channel | null = null;
  subChannel: Channel | null = null;

  async connect() {
    this.rabbitMqPub = await amqplib.connect("amqp://localhost:5672");
    this.pubChannel = await this.rabbitMqPub.createChannel();
    this.rabbitMqSub = await amqplib.connect("amqp://localhost:5672");
    this.subChannel = await this.rabbitMqSub.createChannel();
    console.log("RABBIT MQ successfully connected ");
  }

  publish<T>(queue: string, message: T) {
    this.pubChannel?.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async subscribeToQueues() {
    for (let i = 0; i < QUEUE_METADATA.length; i++) {
      await this.subChannel?.assertQueue(QUEUE_METADATA[i].name);
      this.subChannel?.consume(
        QUEUE_METADATA[i].name,
        QUEUE_METADATA[i].handler
      );
    }
  }
}
