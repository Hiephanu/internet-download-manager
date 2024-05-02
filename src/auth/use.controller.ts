import { Controller, Get, Param, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from 'express'

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Get(':id')
    async getUserById(@Param('id') id:string, @Res() res : Response) {
        const user =await this.userService.findOne(Number.parseInt(id))
         return res.status(200).json({user})
    }
}