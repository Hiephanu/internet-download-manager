import { Inject, Injectable } from "@nestjs/common";
import * as archiver from 'archiver'
@Injectable()
export class ZipService {
    async zipFiles(files : Express.Multer.File[]) {
        const archive = archiver('zip', {
            zlib: {level:9}
        })
        files.forEach((file) => {
            archive.append(file.buffer , {name : file.originalname})
        });
        archive.finalize()
        return archive
    }
}