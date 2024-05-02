import { InjectRepository } from '@nestjs/typeorm'
import {v4 as uuidv4} from 'uuid'
import { File } from './entity/file.enity'
import { Repository } from 'typeorm'
export class FileService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File> ) {}
    generateFileNameUnique(orginalName : string){
        const extension = orginalName.split('.').pop()
        const uniqueId = uuidv4()
        return `${uniqueId}.${extension}`
    }

    async saveFile(file : File){
        const fileSave = await this.fileRepository.save(file)
        return fileSave
    }
}