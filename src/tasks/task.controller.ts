import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { validate } from "../core/utils/validate.util";
import * as taskService from "./task.service";
import { CreateTaskDTO, UpdateTaskDTO } from "./task.dto";
import { TaskStatus } from "../core/enum";
import { pagination } from "../core/interfaces/pagination.interface";

export async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            projectId: Joi.number().required(),
            status: Joi.number().default(1)
        })
        const value = validate<CreateTaskDTO>(req.body, schema);
        const result = await taskService.createTask(value);
        return res.status(201).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            name: Joi.string(),
            description: Joi.string(),
            status: Joi.number()
        })
        const value = validate<UpdateTaskDTO>(req.body, schema);
        const result = await taskService.updateTask(+req.params.id, value);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            page: Joi.number().default(1),
            limit: Joi.number().default(5).min(1).max(20),
            sort: Joi.string().allow(''),
            sortBy: Joi.object().valid(...Object.values(['asc', 'desc'])).allow(''),
            name: Joi.string().allow(''),
            status: Joi.array().items(Joi.number().valid(...Object.values({ ...TaskStatus }))),
            projectId: Joi.number().required()
        })
        const value = validate<pagination>(req.query, schema);
        const result = await taskService.getTasks(value);
        console.log(result)
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await taskService.getTask(+req.params.id);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}