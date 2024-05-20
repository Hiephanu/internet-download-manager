import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as Jimp from "jimp";
import * as path from "path";
import * as fs from 'fs'
import PDFThumbnail from 'pdf-thumbnail';
@Injectable()
export class ThumbnailService {
    async createThumbnailImage(file: Express.Multer.File, name: string) {
        const thumbnailPath = path.join(__dirname, '../thumbnails', name);

        if (!file.buffer || file.buffer.length === 0) {
            throw new BadRequestException("File buffer is empty");
        }

        try {
            switch (file.mimetype) {
                case 'image/png' || 'image/jpg':
                    const image = await Jimp.read(file.buffer);
                    await image.resize(400, 400).writeAsync(thumbnailPath);
                    return thumbnailPath;
                case 'application/pdf':
                    const thumbnail =  await PDFThumbnail(file.buffer, {
                        resize: { width: 100, height: 100 },
                        compress: { type: 'png', quality: 75 },
                    });
                    const writeStream = fs.createWriteStream(thumbnailPath);
                    thumbnail.pipe(writeStream);
                    return thumbnailPath
                default:
                    throw new Error("Unsupported file type");
            }
        } catch (err) {
            console.error(err);
            throw new InternalServerErrorException("Internal error");
        }
    }
}
