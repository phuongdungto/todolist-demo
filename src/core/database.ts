import { DataSource } from "typeorm";
import path from "path";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from "../users/user.entity";
import { Project } from "../projects/project.entity";
import { Task } from "../tasks/task.entity";
import { UserTask } from "../usertask/usertask.entity";
import { init1678867223097 } from "../migrations/1678867223097-init";
import { updateTable1678873399670 } from "../migrations/1678873399670-update-table";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Project, Task, UserTask],
    //entities: [path.join(__dirname, "../**/*.entity{.js,.ts}")],
    subscribers: [],
    migrations: [init1678867223097, updateTable1678873399670],
    //migrations: [path.join(__dirname, "../migrations/*{.js,.ts}")],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    logging: true
})