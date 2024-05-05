import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entity/category.entity";
import { FileService } from "src/file/file.service";
import { File } from "src/file/entity/file.enity";
import { MinioConfigModule } from "src/minio/minioConfig.module";

@Module({
    imports:[TypeOrmModule.forFeature([Category,File]), MinioConfigModule],
    controllers:[CategoryController],
    providers:[CategoryService, FileService,Object]
})

export class CategoryModule {}