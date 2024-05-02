import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { log } from "console";
import * as Minio from 'minio'
import { UserService } from "src/auth/user.service";
import { File } from "src/file/entity/file.enity";
import { FileService } from "src/file/file.service";
import { KafkaProcedureService } from "src/kafka/kafkaProcedure.service";
import { Readable } from 'stream';

@Injectable()
export class MinioFileService {
    constructor( @Inject('MinioClient') private readonly minioClient: Minio.Client,
               private readonly fileService: FileService,
                private readonly userService : UserService) {}

    private readonly BUCKET_NAME = "idm"

    async uploadFile(file: Express.Multer.File,fileName : string, userId : number) {
        try {
            
            const fileBuffer = file.buffer
            const metaData  = {
                'X-Amz-Meta-Author':userId ,
                'X-Amz-Meta-Type': file.mimetype,
                'X-Amz-Meta-Size': file.size.toString(),
                'Content-Type': 'application/octet-stream', 
            }
            const uniqueName = this.fileService.generateFileNameUnique(fileName)

            const fileEntity = new File()

            const user = await this.userService.findOne(userId)

            fileEntity.name = uniqueName
            fileEntity.size = file.size
            fileEntity.type = file.mimetype
            fileEntity.bucket = this.BUCKET_NAME
            fileEntity.user = user

            this.fileService.saveFile(fileEntity)

            const res = await this.minioClient.putObject(this.BUCKET_NAME, uniqueName,fileBuffer, file.size, metaData)
            
            return `File ${file.filename} uploaded success`
        } catch (err) {
            console.log(err);
            throw new BadRequestException('Fail to upload file')
            
        }
    }
    async downloadFile(bucketName : string , objectName : string) {
        try {
            const url = await this.minioClient.presignedGetObject(bucketName, objectName)
            return url
        } catch (err) {
            console.log(err);
            throw new Error()
        }
    }
    async downloadFileStream() : Promise<{stream : Readable, progress: number}> {
        try {
            const stat = await this.minioClient.statObject(this.BUCKET_NAME, 'MUL_B02_Group4.pptx');
            const totalSize = stat.size;

            const stream = await this.minioClient.getObject(this.BUCKET_NAME, 'MUL_B02_Group4.pptx');

            let bytesDownloaded = 0;

            const progressPromise = new Promise<{ stream: Readable, progress: number }>((resolve, reject) => {
                stream.on('data', (chunk) => {
                    bytesDownloaded += chunk.length;                 
                    const progress = Math.round((bytesDownloaded / totalSize) * 100);
                    console.log(progress);
                    
                    resolve({ stream, progress });
                });

                stream.on('error', (err) => {
                    reject(err);
                });
            });
            return progressPromise;
        } catch (error) {
            console.error(error);
            throw new Error('Fail to get file stream from Minio');
        }
    }
}