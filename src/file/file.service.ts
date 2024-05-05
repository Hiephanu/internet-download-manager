import { InjectRepository } from '@nestjs/typeorm'
import {v4 as uuidv4} from 'uuid'
import { File } from './entity/file.enity'
import { Repository } from 'typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'
import { MinioFileService } from 'src/minio/minioFile.service'
import { FileChangeCategoryReq } from './dto/file-change-category-req'
import { Category } from 'src/category/entity/category.entity'

@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>,
                private readonly minioService: MinioFileService ) {}
    generateFileNameUnique(orginalName : string){
        const extension = orginalName.split('.').pop()
        const uniqueId = uuidv4()
        return `${uniqueId}.${extension}`
    }

    async saveFile(file : File){
        const fileSave = await this.fileRepository.save(file)
        return fileSave
    }

    async getFileById(id : number){
        const file = await this.fileRepository.findOneBy({id})
        if(file) {
            return file
        } 
        else {
            throw new BadRequestException('Can not find file')
        }
    }

    async getAllFileByCategory(categoryId : number) {
        const files = await this.fileRepository.findBy({category : {id : categoryId}})
        return files
    }

    async deleteFileById(id : number) {
        const file =await this.getFileById(id)
        this.fileRepository.delete({id : id})
        await this.minioService.deleteObject(file.bucket,file.name)
    }

    async changeFileToOtherCategory(id : number, fileChangeCategoryReq : FileChangeCategoryReq){
        const file =await this.getFileById(id)
        const category = new Category()
        category.id = fileChangeCategoryReq.categoryId
        file.category = category

        await this.fileRepository.save(file)
    }
    // async downloadFile(@Body() ) {

    // }
}