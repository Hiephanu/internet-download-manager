import { User } from "src/auth/entity/user.entity";
import { File } from "src/file/entity/file.enity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => User, user => user.categories) // Tham chiếu đến field 'categories' trong User entity
    user: User;

    @OneToMany(() => File, file => file.category)
    files: File[];
    
    @CreateDateColumn()
    createdAt: Date;
}
