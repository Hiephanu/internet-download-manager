import { Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MinioFileService } from "./minioFile.service";
import { Response } from 'express'
import { log } from "console";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('file')
export class MinioController {
    constructor(private readonly minioService : MinioFileService){}

    @Get()
    async downloadFile(@Res() res: Response){
        try {
            const url=await this.minioService.downloadFile("idm", "MUL_B02_Group4.pptx")
            
            // res.setHeader('Content-disposition', 'attachment; filename=' + 'Test');
            // res.setHeader('Content-type', 'application/octet-stream');

            // stream.pipe(res)

            // stream.on('end', () => {
            //     console.log('File download completed.');
            // });
            // stream.on('error', (err) => {
            //     console.error('Error downloading file:', err);
            //     throw new Error('Fail to download file');
            // });
            // console.log(progress);
            // return { progress };
            return res.status(200).json({url})
        } catch(err) {
            console.log(err);
            throw new Error("Could not download file")
        }
    }
    @Post()
    // @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            this.minioService.uploadFile(file,"Test",1);
        } catch (error) {
            console.log(error);
            throw new Error("Could not uplaod file")
        }
    }
}
