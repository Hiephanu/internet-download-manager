import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DownloadTask } from "./entity/downloadTask.entity";
import { Repository } from "typeorm";
import { MinioFileService } from "src/minio/minioFile.service";
import { DownloadTaskReqDto } from "./dto/download-task-req-dto";
import { DownloadTaskStatus } from "./enum/enum";
import { FileService } from "src/file/file.service";
import { Response } from "express";
import internal from "stream";

@Injectable()
export class DownloadTaskService {
    constructor(@InjectRepository(DownloadTask) private readonly downloadTaskRepository : Repository<DownloadTask> ,
                private readonly fileService: FileService,
                private readonly minioService:MinioFileService) {}

    async getTaskById(id :number) {
        return await this.downloadTaskRepository.findOneBy({id: id})
    }
    async initDownloadTask(downloadTaskReq : DownloadTaskReqDto){
        const downloadTask = new DownloadTask()
        downloadTask.file_id = downloadTaskReq.fileId
        downloadTask.user_id = downloadTaskReq.userId
        downloadTask.status = DownloadTaskStatus.PENDING

        return this.downloadTaskRepository.save(downloadTask)
    }

    async implementDownloadTask(id : number,res : Response,startPosition : number =0) {
        try {
            const downloadTask =await this.downloadTaskRepository.findOne({where : {id : id}})
            
            const file =await this.fileService.getFileById(downloadTask.file_id)
            
            res.setHeader('Content-disposition', 'attachment; filename=' + `${file.name}`);
            res.setHeader('Content-type', 'application/octet-stream');
            if(downloadTask) {
                downloadTask.status = DownloadTaskStatus.DOWNLOADING
                this.downloadTaskRepository.save(downloadTask)
                let stream  = null
                let nameFile = ''
                
                
                if(startPosition > 0) {
                    const fileSize = file.size
                    stream = await this.minioService.continueDownloadFile('idm',file.name,startPosition,fileSize-startPosition)
                } else {
                    stream =await this.minioService.downloadFile('idm', file.name)
                    nameFile = file.name
                }
                let byteSent= 0
                let isPause = false

                stream.pipe(res)
    
                stream.on('data', (chunk)=> {
                    if(!isPause) {
                        res.write(chunk)
                        byteSent += chunk.length
                    }
                })
    
                stream.on('end', ()=> {
                    console.log('end stream');
                })
                return {stream ,nameFile}
            } else {
                throw  new NotFoundException('Can not find task!')
            }
         
        } catch(err) {
            console.log(err)
            throw new InternalServerErrorException('Can not get stream file')
        }
    } 

    async pauseDownload(id : number, byteSent : number, stream : internal.Readable) {
        const downloadTask = await this.downloadTaskRepository.findOneBy({id : id})
        if(downloadTask) {
            downloadTask.status = DownloadTaskStatus.PAUSE
            downloadTask.byteSent = byteSent
            stream.pause()
            this.downloadTaskRepository.save(downloadTask)
        }
    }
}