import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { validate } from "../core/utils/validate.util";
import * as projectService from "./project.service";
import { CreateProjectDTO, UpdateProjectDTO } from "./project.dto";

export async function createProject(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            leaderId: Joi.number().required(),
            name: Joi.string().required()
        });
        const value = validate<CreateProjectDTO>(req.body, schema);
        console.log(value);
        const result = await projectService.createProject(value);
        return res.status(201).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function updateProject(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            leaderId: Joi.number(),
            name: Joi.string()
        });
        const value = validate<UpdateProjectDTO>(req.body, schema);
        const result = await projectService.updateProject(+req.params.id, value);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

