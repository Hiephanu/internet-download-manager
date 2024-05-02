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

@Module({
  imports: [MinioModule, KafkaModule, AuthModule,UserModule, TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port: 3306,
    username: 'root',
    password:'',
    database:'idm',
    entities:[User,File],
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
