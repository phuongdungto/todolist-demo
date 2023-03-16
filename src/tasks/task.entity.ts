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
import { TaskStatus } from "../core/enum";
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

    @Column({
        name: 'status',
        nullable: false,
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.MEDIUM
    })
    status: TaskStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

    @ManyToOne(() => Project, (project) => project.tasks)
    @JoinColumn()
    project: Relation<Project>[];

    @Column({ nullable: false })
    projectId: number

    @OneToMany(() => UserTask, (usertask) => usertask.task)
    usertasks: Relation<UserTask>[];
}