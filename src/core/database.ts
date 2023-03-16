import { DataSource } from "typeorm";
import * as path from "path";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from "../users/user.entity";
import { Project } from "../projects/project.entity";
import { Task } from "../tasks/task.entity";
import { UserTask } from "../usertask/usertask.entity";
import { init1678867223097 } from "../migrations/1678867223097-init";
import { updateTable1678873399670 } from "../migrations/1678873399670-update-table";
import { updateUser1678881500354 } from "../migrations/1678881500354-update-user";
import { updateRelation1678883602238 } from "../migrations/1678883602238-update-relation";
import { updateRelationV21678885295463 } from "../migrations/1678885295463-update-relation-v2";
import { updateProjects1678901935313 } from "../migrations/1678901935313-update-projects";
import { updateRelationV31678907212221 } from "../migrations/1678907212221-update-relation-v3";
import { updateProjectV21678940490230 } from "../migrations/1678940490230-update-project-v2";
import { updateUserTask1678955594904 } from "../migrations/1678955594904-update-userTask";
import * as dotenv from "dotenv";
dotenv.config();

console.log(path.resolve("src/**/**.entity.ts"))

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Project, Task, UserTask],
    //entities: ["../projects/project.entity"],
    subscribers: [],
    migrations: [
        init1678867223097, updateTable1678873399670, updateUser1678881500354,
        updateRelation1678883602238, updateRelationV21678885295463, updateProjects1678901935313,
        updateRelationV31678907212221, updateProjectV21678940490230, updateUserTask1678955594904
    ],
    // migrations: [path.join(__dirname, "../migrations/*{.js,.ts}")],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    logging: true
})