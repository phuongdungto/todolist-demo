import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    Relation,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";
import { User } from '../users/user.entity';
import { Task } from "../tasks/task.entity";
@Entity('projects')
export class Project {
    constructor(data: Partial<Project>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'name' })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn()
    user: Relation<User>;

    @OneToMany(() => Task, (task) => task.project)
    @JoinColumn()
    tasks: Relation<User>[];

}