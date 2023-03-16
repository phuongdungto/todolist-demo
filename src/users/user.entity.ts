import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Relation,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Project } from '../projects/project.entity';
import { UserTask } from "../usertask/usertask.entity";
import { Roles } from "../core/enum";
@Entity('users')
export class User {
    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'fullname' })
    fullname: string;

    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'password', select: false })
    password?: string;

    @Column({
        name: 'role',
        type: 'enum',
        enum: Roles,
        default: Roles.MENBER,
        nullable: false
    })
    role: Roles;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

    @ManyToOne(() => Project, (project) => project.users)
    @JoinColumn()
    project: Relation<Project>;

    @Column({ nullable: true })
    projectId: number

    @OneToMany(() => UserTask, (usertask) => usertask.user)
    usertasks: Relation<UserTask>[];

    @OneToMany(() => Project, (project) => project.leader)
    projects: Relation<Project>[];
}