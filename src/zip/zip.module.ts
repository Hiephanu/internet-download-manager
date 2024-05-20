import { Module } from "@nestjs/common";
import { ZipController } from "./zip.controller";
import { ZipService } from "./zip.service";

@Module({
    controllers:[ZipController],
    providers:[ZipService]
})

export class ZipModule {}