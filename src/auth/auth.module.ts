import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ConvertUser } from './converter/convertUser';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstant } from './constant/jwt';

@Module({
    imports:[TypeOrmModule.forFeature([User]),JwtModule.register({
        global:true,
        secret:jwtConstant.secretKey,
        signOptions: {expiresIn: 60*60*1}

    })],
    providers:[AuthService, ConvertUser, UserService],
    controllers:[AuthController]
})
export class AuthModule {}
