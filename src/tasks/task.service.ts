import { CreateTaskDTO, UpdateTaskDTO } from "./task.dto";
import { AppDataSource } from "../core/database";
import { Task } from "./task.entity";
import { BadRequest, Unauthorized, NotFound } from 'http-errors';
import { In } from "typeorm";

const taskRepo = AppDataSource.getRepository(Task);

export async function createTask(createTaskDTO: CreateTaskDTO) {
    const newTask = taskRepo.save(createTaskDTO);
    if (!newTask) {
        throw new BadRequest("Cant't create task");
    }
    return newTask;
}

export async function updateTask(id: number, updateTaskDTO: UpdateTaskDTO) {
    const task = taskRepo.findOneBy({
        id: id
    })
    if (!task) {
        throw new NotFound('Task not found');
    }
    await taskRepo.update(id, updateTaskDTO);
    return task;
}