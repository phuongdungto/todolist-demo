import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { validate } from "../core/utils/validate.util";
import * as taskService from "./task.service";
import { CreateTaskDTO, UpdateTaskDTO } from "./task.dto";

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