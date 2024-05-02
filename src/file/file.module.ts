import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./entity/file.enity";

@Module({
    imports:[TypeOrmModule.forFeature([File])],
    controllers:[FileController],
    providers:[{
        provide: 'FileService',
        useValue: FileService
    }]
})

export class FileModule {}