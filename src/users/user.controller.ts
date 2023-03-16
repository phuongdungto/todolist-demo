import * as Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { validate } from "../core/utils/validate.util";
import * as userService from "./user.service";
import { AddUserProjectDTO, AddUserTaskDTO, CreateUserDTO, LoginDTO } from "./user.dto";
import { Roles } from "../core/enum";
import { pagination } from "../core/interfaces/pagination.interface";

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            fullname: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const value = validate<CreateUserDTO>(req.body, schema);
        const result = await userService.signup(value);
        return res.status(201).send(result);
    } catch (error) {
        return next(error);
    }
}
export async function signin(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const value = validate<LoginDTO>(req.body, schema);
        const result = await userService.signin(value);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function addUsersToProject(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            userId: Joi.array().min(1).required(),
            projectId: Joi.number().required()
        });
        const value = validate<AddUserProjectDTO>(req.body, schema);
        await userService.addUsersToProject(value);
        return res.status(200).send();
    } catch (error) {
        return next(error);
    }
}

export async function addUsersToTask(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            userId: Joi.array().min(1).required(),
            taskId: Joi.number().required()
        });
        const value = validate<AddUserTaskDTO>(req.body, schema);
        await userService.addUsersToTask(value);
        return res.status(200).send();
    } catch (error) {
        return next(error);
    }
}

export async function deleteUsersOfProject(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            userId: Joi.array().min(1).required(),
            projectId: Joi.number().required()
        });
        const value = validate<AddUserProjectDTO>(req.body, schema);
        await userService.deleteUsersOfProject(value);
        return res.status(200).send();
    } catch (error) {
        return next(error);
    }
}

export async function deleteUsersOfTask(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            id: Joi.array().min(1).required()
        });
        const value = validate(req.body, schema);
        await userService.deleteUsersOfTask(value);
        return res.status(200).send();
    } catch (error) {
        return next(error);
    }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            page: Joi.number().default(1),
            limit: Joi.number().default(5).min(1).max(20),
            sort: Joi.string().allow(''),
            sortBy: Joi.object().valid(...Object.values(['asc', 'desc'])).allow(''),
            email: Joi.string().allow(''),
            fullname: Joi.string().allow(''),
            role: Joi.array().items(Joi.string().valid(...Object.values({ ...Roles }))),
            projectId: Joi.number().allow('')
        })
        const value = validate<pagination>(req.query, schema);
        const result = await userService.getUsers(value);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await userService.getUser(+req.params.id);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

