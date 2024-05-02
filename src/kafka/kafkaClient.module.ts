import { Inject, Module } from "@nestjs/common";
import { KafkaConsumerService } from "./consumers/kafkaDownloadTaskConsumer.service";
import { KafkaProcedureService } from "./kafkaProcedure.service";
import { KafkaController } from "./testKafka.controller";
import { MinioModule } from "src/minio/minio.module";
import * as Minio from 'minio'

@Module({
    imports:[MinioModule],
    providers:[KafkaConsumerService, KafkaProcedureService],
    controllers:[KafkaController],
    exports: [KafkaConsumerService]
})

export class KafkaModule{}