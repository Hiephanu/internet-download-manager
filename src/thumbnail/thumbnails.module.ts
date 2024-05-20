import { Module } from "@nestjs/common";
import { ThumbnailService } from "./thumbnail.service";
import { MulterModule } from "@nestjs/platform-express";
import { ThumbnailController } from "./thumbnail.controller";

@Module({
    controllers:[ThumbnailController],
    providers:[ThumbnailService]
})

export class ThumbnailsModule {}