import { Module } from "@nestjs/common";
import * as Minio from 'minio'
import { MinioController } from "./minio.controller";
import { MinioFileService } from "./minioFile.service";
import { FileService } from "src/file/file.service";
import { UserService } from "src/auth/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/auth/entity/user.entity";
import { File } from "src/file/entity/file.enity";

@Module({
    imports:[ TypeOrmModule.forFeature([User,File])],
    controllers:[MinioController],
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
        MinioFileService,FileService,UserService
    ]
})

export class MinioModule {}