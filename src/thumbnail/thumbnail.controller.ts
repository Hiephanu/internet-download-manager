import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response} from 'express'
import { ThumbnailService } from './thumbnail.service';

@Controller('thumbnail')
export class ThumbnailController {
    constructor(private readonly thumnailService : ThumbnailService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createThumbnail(@UploadedFile() file : Express.Multer.File,@Res() res: Response) {    
    const result = await this.thumnailService.createThumbnailImage(file, "hi.jpg")
    return res.status(201).json({result : result});
  }
}
