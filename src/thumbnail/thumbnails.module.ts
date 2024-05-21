import { Module } from "@nestjs/common";
import { ThumbnailService } from "./thumbnail.service";
import { ThumbnailController } from "./thumbnail.controller";

@Module({
    controllers:[ThumbnailController],
    providers:[ThumbnailService]
})

export class ThumbnailsModule {}