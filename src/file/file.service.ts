import { InjectRepository } from '@nestjs/typeorm'
import {v4 as uuidv4} from 'uuid'
import { File } from './entity/file.enity'
import { Repository } from 'typeorm'
import { BadRequestException, Injectable } from '@nestjs/common'
import { MinioFileService } from 'src/minio/minioFile.service'
import { FileChangeCategoryReq } from './dto/file-change-category-req'
import { Category } from 'src/category/entity/category.entity'
import { SaveFile } from './dto/save-file'
import { ThumbnailService } from 'src/thumbnail/thumbnail.service'
import { CategoryService } from 'src/category/category.service'
import { UserService } from 'src/auth/user.service'

@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>,
                private readonly minioService: MinioFileService,
                private readonly thumbnailService: ThumbnailService,
                private readonly categoryService: CategoryService,
                private readonly userService: UserService ) {}
    generateFileNameUnique(orginalName : string){
        const extension = orginalName.split('.').pop()
        const uniqueId = uuidv4()
        return `${uniqueId}.${extension}`
    }

    async saveFile(saveFile : SaveFile){
        const file = new  File()

        const uniqueName = this.generateFileNameUnique(saveFile.file.originalname)
        
        file.bucket = "IDM"

        const category =await this.categoryService.getCategoryById(saveFile.categoryId);
        file.category = category

        const user = await this.userService.findOne(saveFile.userId)
        file.user = user

        file.size = saveFile.file.size
        file.type = saveFile.file.mimetype
        file.name = uniqueName
        file.thumbnail =await this.thumbnailService.createThumbnailImage(saveFile.file, uniqueName)
        await this.minioService.uploadFile(saveFile.file, uniqueName, saveFile.userId)

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
}