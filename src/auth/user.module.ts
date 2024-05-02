import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./use.controller";
import { ConvertUser } from "./converter/convertUser";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers: [UserService, ConvertUser],
    controllers : [UserController]
})

export class UserModule{}