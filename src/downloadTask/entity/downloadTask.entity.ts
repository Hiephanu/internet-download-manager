import { Column, CreateDateColumn, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { DownloadTaskStatus } from "../enum/enum";

@Entity()
export class DownloadTask {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    file_id : number
    @Column()
    user_id : number
    @Column({type: 'enum', enum : DownloadTaskStatus, default: DownloadTaskStatus.PENDING})
    status: DownloadTaskStatus
    @Column()
    byteSent: number
    @CreateDateColumn()
    createdAt : Date
}