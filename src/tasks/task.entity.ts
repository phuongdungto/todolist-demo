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
import { Project } from "../projects/project.entity";
import { UserTask } from "../usertask/usertask.entity";
@Entity('tasks')
export class Task {
    constructor(data: Partial<Task>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'status', default: 1, nullable: false })
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

    @ManyToOne(() => Project, (project) => project.tasks)
    @JoinColumn()
    project: Relation<Project>[];

    @OneToMany(() => UserTask, (usertask) => usertask.task)
    usertasks: Relation<UserTask>[];
}