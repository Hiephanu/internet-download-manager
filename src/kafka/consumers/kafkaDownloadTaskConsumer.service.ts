import { Inject, Injectable } from "@nestjs/common";
import { Consumer, Kafka } from "kafkajs";
import * as Minio from 'minio'
import * as fs from 'fs'
@Injectable()
export class KafkaConsumerService {
    private readonly kafka : Kafka
    private readonly consumer : Consumer
    constructor() {
        this.kafka = new Kafka({
            brokers: ['localhost:9092'],
        })
        this.consumer = this.kafka.consumer({groupId : 'idm'})
    }

    public async listenForDownLoadTask() {
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: 'download-task-topic' })
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const downloadTask = JSON.parse(message.value.toString())
                // await this.handleDownloadTask(downloadTask)
            },
        })
    }
    
    // private async handleDownloadTask(downloadTask: any) {
    //     const { bucketName, objectName, targetFilePath } = downloadTask;
    
    //     try {
    //       const stream = await this.minioClient.getObject(bucketName, objectName);
    //       const fileStream = fs.createWriteStream(targetFilePath);
    
    //       stream.pipe(fileStream);
    //       console.log(`File downloaded successfully to: ${targetFilePath}`);
    //     } catch (error) {
    //       console.error('Error downloading file:', error);
    //     }
    // }
}