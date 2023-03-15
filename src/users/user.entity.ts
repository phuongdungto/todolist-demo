import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Relation,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";
import { Project } from '../projects/project.entity';
import { UserTask } from "../usertask/usertask.entity";
@Entity('users')
export class User {
    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password', select: false })
    password?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

    @OneToMany(() => Project, (project) => project.user)
    projects: Relation<Project>[];

    @OneToMany(() => UserTask, (usertask) => usertask.user)
    usertasks: Relation<UserTask>[];
}