import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as Minio from 'minio'
import { FileService } from "src/file/file.service";

@Injectable()
export class MinioFileService {
    constructor( @Inject('MinioClient') private readonly minioClient: Minio.Client,
               private readonly fileService: FileService) {}

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

            await this.minioClient.putObject(this.BUCKET_NAME,fileName,fileBuffer, file.size, metaData)
            
            return `File ${file.filename} uploaded success`
        } catch (err) {
            console.log(err);
            throw new BadRequestException('Fail to upload file')
            
        }
    }

    async downloadFile(bucketName : string , objectName : string) {
        return await this.minioClient.getObject(bucketName, objectName)
    }

    async continueDownloadFile(bucketName: string, objectName : string, startPosition : number, length :number) {
        return await this.minioClient.getPartialObject(bucketName,objectName,startPosition,length);
    }

    async deleteObject(bucketName : string , objectName : string) {
        return await this.minioClient.removeObject(bucketName,objectName)
    }
}