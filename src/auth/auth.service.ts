import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginReq } from './req/login-req';
import { LoginRes } from './res/login-res';
import { RegisterReq } from './req/register-req';
import { RegisterRes } from './res/register-res';
import * as bcrypt from 'bcrypt'
import { User } from './entity/user.entity';
import { ConvertUser } from './converter/convertUser';
import { UserService } from './user.service';
import { InvalidException } from 'src/exception/InValidException';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly convertUser : ConvertUser,
                private readonly userService: UserService,
                private jwtService : JwtService
    ) {}

    async login(loginReq : LoginReq) :Promise<LoginRes> {
        const user = await this.userService.findByEmail(loginReq.email)
        if(user) {
            const isMatch = await bcrypt.compare(loginReq.password, user.password)
            if(isMatch) {
                const payload = {id: user.id, username : user.username}
                const accessToken = await this.jwtService.signAsync(payload);
                const loginRes = new LoginRes()
                loginRes.userId = user.id
                loginRes.username =user.username
                loginRes.accessToken = accessToken
                return loginRes
            } else {
                throw new UnauthorizedException("Wrong password")
            }
        } else {
            throw new UnauthorizedException("Email is not found")
        }
    }
    async register(registerReq : RegisterReq) : Promise<any>{
        const userByEmail =await this.userService.findByEmail(registerReq.email)
        console.log(userByEmail);
        
        if(userByEmail) {
            throw new InvalidException("Email exsited!")
        } else {
            const userByUserName =await this.userService.findByUsername(registerReq.username)
            if(userByUserName) {
                throw new InvalidException("Username is exsited!")
            } else {
                const user= new User()
        
                user.username = registerReq.username
                user.email = registerReq.email
        
                const saltRound = 10
                const salt = await bcrypt.genSalt(saltRound)
                const hash = await bcrypt.hash(registerReq.password, salt);
                user.password = hash
                const userSave =await this.userService.saveUser(user)
                return this.convertUser.convertFromUserToRegisterRes(userSave);
            }
        }
    }
}
