import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./entity/file.enity";
import { MinioFileService } from "src/minio/minioFile.service";
import { MinioConfigModule } from "src/minio/minioConfig.module";
import * as Minio from 'minio'

@Module({
    imports:[TypeOrmModule.forFeature([File])],
    controllers:[FileController],
    providers:[{
        provide: 'MinioClient',
        useValue: new Minio.Client({
            endPoint: 'localhost',
            port: 9000,
            useSSL: false,
            accessKey: '87N4SchOyER5sNAMjZHS',
            secretKey: 'Kogf4cJvLgonCFINuBzfvsCaMTFwIy8IND0vwyrd',
        }),
    },{
        provide: 'FileService',
        useValue: FileService
    }, MinioFileService]
})

export class FileModule {}