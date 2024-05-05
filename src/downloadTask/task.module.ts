import { Inject, Module } from "@nestjs/common";
import { DownloadTaskController } from "./task.controller";
import { DownloadTaskService } from "./task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DownloadTask } from "./entity/downloadTask.entity";
import { FileService } from "src/file/file.service";
import { MinioFileService } from "src/minio/minioFile.service";
import * as Minio from 'minio'
import { UserService } from "src/auth/user.service";
import { User } from "src/auth/entity/user.entity";
import {File} from 'src/file/entity/file.enity'
import { MinioConfigModule } from "src/minio/minioConfig.module";

@Module({
    imports: [TypeOrmModule.forFeature([DownloadTask,User,File])],
    controllers:[DownloadTaskController,],
    providers:[
        {
        provide:'MinioClient',
        useValue: new Minio.Client({
            endPoint:'localhost',
            port:9000,
            useSSL:false,
            accessKey: '87N4SchOyER5sNAMjZHS',
            secretKey: 'Kogf4cJvLgonCFINuBzfvsCaMTFwIy8IND0vwyrd'
        })
    },
    DownloadTaskService, FileService, UserService, MinioFileService, Object]
})

export class DownloadTaskModule {}