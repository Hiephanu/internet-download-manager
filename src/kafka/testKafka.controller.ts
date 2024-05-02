import { Controller, Get } from "@nestjs/common";
import { KafkaConsumerService } from "./consumers/kafkaDownloadTaskConsumer.service";

@Controller('kafka')
export class KafkaController {
    constructor(private readonly KafkaConsumerService : KafkaConsumerService) {}
    @Get('start-downloadFile')
    start(){
        this.KafkaConsumerService.listenForDownLoadTask();
        return "Kafka consumer started!"
    }
}