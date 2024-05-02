import { Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterReq } from './req/register-req';
import {Response} from 'express'
import { LoginReq } from './req/login-req';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}
    
    @Post('login')
    async login(@Body() loginReq : LoginReq , @Res() res : Response) {
        console.log(this.authService.login(loginReq));
        const result =await this.authService.login(loginReq)
        return  res.status(200).json(result)
    }

    @Post('register')
    async register(@Body() registerReq : RegisterReq, @Res() res : Response){
            return  res.status(200).json(await this.authService.register(registerReq))
    }
}
