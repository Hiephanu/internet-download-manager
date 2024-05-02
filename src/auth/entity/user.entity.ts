import { Column, CreateDateColumn, Entity, OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { File } from "src/file/entity/file.enity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    email : string 

    @Column()
    username : string

    @Column()
    password: string

    @OneToMany(type => File, file => file.user)
    files : File[]

    @CreateDateColumn()
    createdAt : Date
}