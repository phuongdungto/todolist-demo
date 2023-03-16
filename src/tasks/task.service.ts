import { CreateTaskDTO, UpdateTaskDTO } from "./task.dto";
import { AppDataSource } from "../core/database";
import { Task } from "./task.entity";
import { BadRequest, Unauthorized, NotFound } from 'http-errors';
import { pagination } from "../core/interfaces/pagination.interface";
import { Pagination } from "../core/utils/pagination.util";
import { In, Like } from "typeorm";

const taskRepo = AppDataSource.getRepository(Task);

export async function createTask(createTaskDTO: CreateTaskDTO) {
    const newTask = await taskRepo.save(createTaskDTO);
    if (!newTask) {
        throw new BadRequest("Cant't create task");
    }
    return newTask;
}

export async function updateTask(id: number, updateTaskDTO: UpdateTaskDTO) {
    const task = await taskRepo.findOneBy({
        id: id
    })
    if (!task) {
        throw new NotFound('Task not found');
    }
    await taskRepo.update(id, updateTaskDTO);
    return task;
}

export async function getTasks(pagination: pagination) {
    const query = Pagination(Task, pagination);
    console.log(query)
    const [list, count] = await taskRepo.findAndCount({
        ...query,
        // relations: {
        //     usertasks: true
        // }
    })
    return { totalPages: Math.ceil(count / pagination.limit), tasks: list };
}

export async function getTask(id: number) {
    const task = await taskRepo.findOne({
        where: { id: id },
        relations: {
            usertasks: true
        }
    })
    return task;
}