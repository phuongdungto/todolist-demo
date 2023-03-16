import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { validate } from "../core/utils/validate.util";
import * as projectService from "./project.service";
import { CreateProjectDTO, UpdateProjectDTO } from "./project.dto";
import { pagination } from "../core/interfaces/pagination.interface";

export async function createProject(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            name: Joi.string().required()
        });
        const value = validate<CreateProjectDTO>({ ...req.body, leaderId: req.user.id }, schema);
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
        });
        const value = validate<UpdateProjectDTO>(req.body, schema);
        const result = await projectService.updateProject(+req.params.id, value);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getProjects(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            page: Joi.number().default(1),
            limit: Joi.number().default(5),
            sort: Joi.string().allow(''),
            sortBy: Joi.object().valid(...Object.values(['asc', 'desc'])).allow(''),
            name: Joi.string().allow(''),
            leaderId: Joi.number()
        });
        const value = validate<pagination>(req.query, schema);
        const result = await projectService.getProjects(value);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getProject(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await projectService.getProject(+req.params.id);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

