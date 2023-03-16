import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Relation,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column
} from "typeorm";
import { User } from '../users/user.entity';
import { Task } from "../tasks/task.entity";
@Entity('user_task')
export class UserTask {
    constructor(data: Partial<UserTask>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.usertasks)
    @JoinColumn()
    user: Relation<User>;

    @Column({ nullable: false })
    userId: number

    @ManyToOne(() => Task, (task) => task.usertasks)
    @JoinColumn()
    task: Relation<Task>;

    @Column({ nullable: false })
    taskId: number
}