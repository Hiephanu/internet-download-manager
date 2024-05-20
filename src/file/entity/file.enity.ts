import { User } from "src/auth/entity/user.entity";
import { Category } from "src/category/entity/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    size : number

    @Column()
    type : string

    @Column()
    thumbnail : string

    @Column()
    bucket : string

    @ManyToOne(type => User , user => user.files)
    @JoinColumn({name : 'userId'})
    user : User

    @ManyToOne(type => Category, category => category.files)
    @JoinColumn({name : 'categoryId'})
    category : Category

    @CreateDateColumn()
    createdAt : Date
}