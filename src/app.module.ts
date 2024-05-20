import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinioModule } from './minio/minio.module';
import { KafkaModule } from './kafka/kafkaClient.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './auth/entity/user.entity';
import { UserModule } from './auth/user.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { File } from './file/entity/file.enity';
import { DownloadTask } from './downloadTask/entity/downloadTask.entity';
import { DownloadTaskModule } from './downloadTask/task.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entity/category.entity';
import { ZipModule } from './zip/zip.module';
import { ThumbnailsModule } from './thumbnail/thumbnails.module';

@Module({
  imports: [DownloadTaskModule,MinioModule, KafkaModule, AuthModule, UserModule, ZipModule, CategoryModule, ThumbnailsModule, TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port: 3306,
    username: 'root',
    password:'',
    database:'idm',
    entities:[User,File,DownloadTask, Category],
    migrations:[
      'src/migration/**/*.ts'
    ],
    synchronize:true
  })],
  controllers: [AppController],
  providers: [   
    {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  AppService]
})
export class AppModule {
  constructor(private readonly dataSoure: DataSource) {}
}
