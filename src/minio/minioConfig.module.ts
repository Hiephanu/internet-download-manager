// minio.module.ts

import { Module } from '@nestjs/common';
import * as Minio from 'minio'

@Module({
    providers: [
        {
            provide: 'MinioClient',
            useValue: new Minio.Client({
                endPoint: 'localhost',
                port: 9000,
                useSSL: false,
                accessKey: '87N4SchOyER5sNAMjZHS',
                secretKey: 'Kogf4cJvLgonCFINuBzfvsCaMTFwIy8IND0vwyrd',
            }),
        },
    ],
    exports: ['MinioClient'],
})
export class MinioConfigModule {}
