import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { validate } from "../core/utils/validate.util";
import * as userService from "./user.service";
import { CreateUserDTO, LoginDTO } from "./user.dto";

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

