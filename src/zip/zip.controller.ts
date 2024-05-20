import { Controller, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ZipService } from "./zip.service";
import {Response} from 'express'
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller('zip')
export class ZipController {
    constructor(private readonly zipService: ZipService) {}
    @Post('')
    @UseInterceptors(FilesInterceptor('files'))
    async zipFiles(@UploadedFiles() files: Express.Multer.File[], @Res() res : Response) {
        console.log(files);
        
        const archiveStream =await this.zipService.zipFiles(files)
        
        res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename=output.zip'
        })

        archiveStream.pipe(res)
    }

}