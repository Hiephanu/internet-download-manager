import { Injectable } from "@nestjs/common";
import { Kafka, KafkaJSLockTimeout, Producer } from "kafkajs";

@Injectable()
export class KafkaProcedureService {
    private readonly kafka: Kafka
    private readonly producer : Producer;
    constructor() {
        this.kafka = new Kafka({
            clientId: 'idm',
            brokers: ['localhost:9092']
        })
        this.producer = this.kafka.producer()
    }

    async sendMessage(topic :string,bucketName:string, objectName:String, chunk : Buffer) {
        const chunkInfor = {
            bucketName,
            objectName,
            chunk
        }
        await this.producer.connect()
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(chunkInfor) }],
        })
        await this.producer.disconnect()
    }
}