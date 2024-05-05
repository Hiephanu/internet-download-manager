import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository : Repository<User>) {}

    async findAll() : Promise<User[]> {
        return await this.userRepository.find()
    }

    async findOne(id : number) : Promise<User> {
        const user =  await this.userRepository.findOneBy({id})
        if(user) {
            return user
        } else{
            throw new BadRequestException('User not found')
        }
    }

    async findByEmail(email : string) {
        const user = await this.userRepository.findOne({where: {email:email}})
        if(user){
            return user
        } else {
            throw new BadRequestException('User not found')
        }
    }
    async findByUsername(username : string) {
        const user = await this.userRepository.findOne({where: {username : username}})
        return user
    }
    async saveUser(user : User) : Promise<User> {
        return this.userRepository.save(user)
    }

    async deleteUser(id : number) : Promise<void> {
        await this.userRepository.delete(id)
    }
}