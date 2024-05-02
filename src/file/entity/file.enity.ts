import { User } from "src/auth/entity/user.entity";
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
    bucket : string

    @ManyToOne(type => User , user => user.files)
    @JoinColumn({name : 'userId'})
    user : User

    @CreateDateColumn()
    createdAt : Date
}