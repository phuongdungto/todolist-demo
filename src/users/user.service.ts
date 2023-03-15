import { CreateUserDTO } from "./user.dto";
import { AppDataSource } from "../core/database";
import { User } from "./user.entity";
import { BadRequest, Unauthorized, NotFound } from 'http-errors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const userRepo = AppDataSource.getRepository(User);

export async function signup(CreateUserDTO: CreateUserDTO) {
    const checkuser = await userRepo.findOneBy({
        email: CreateUserDTO.email
    })
    if (checkuser) {
        throw new BadRequest('email already existed');
    }
    const newuser = new User(CreateUserDTO);
    newuser.password = await bcrypt.hash(CreateUserDTO.password, 10);
    await userRepo.save(newuser);
    delete newuser.password;
    return newuser;
}