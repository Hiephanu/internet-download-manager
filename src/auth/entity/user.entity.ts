import { Column, CreateDateColumn, Entity, OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { File } from "src/file/entity/file.enity";
import { Category } from "src/category/entity/category.entity";
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

    @OneToMany(type => Category, category => category.user)
    categories : Category[]

    @CreateDateColumn()
    createdAt : Date
}