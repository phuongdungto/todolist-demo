import { CreateUserDTO, AddUserProjectDTO } from "./user.dto";
import { AppDataSource } from "../core/database";
import { User } from "./user.entity";
import { Project } from "../projects/project.entity";
import { BadRequest, Unauthorized, NotFound } from 'http-errors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as dotenv from "dotenv";
import { In } from "typeorm";
dotenv.config();

const userRepo = AppDataSource.getRepository(User);
const projectRepo = AppDataSource.getRepository(Project)
const saltRounds = 10;

export async function signup(CreateUserDTO: CreateUserDTO) {
    const checkuser = await userRepo.findOneBy({
        email: CreateUserDTO.email
    })
    if (checkuser) {
        throw new BadRequest('email already existed');
    }
    const newuser = new User(CreateUserDTO);
    const salt = await bcrypt.genSalt(saltRounds)
    newuser.password = await bcrypt.hash(newuser.password, salt);
    await userRepo.save(newuser);
    delete newuser.password;
    return newuser;
}

export async function signin(CreateUserDTO: CreateUserDTO) {
    const user = await userRepo.findOneBy({
        email: CreateUserDTO.email,
    })
    if (!user) {
        throw new BadRequest('email or password is incorrect');
    }
    const iPwd = bcrypt.compare(CreateUserDTO.password, user.password);
    if (!iPwd) {
        throw new BadRequest('email or password is incorrect');
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION });
    delete user.password;
    return { information: user, accessToken };
}

export async function addUsersToProject(addUser: AddUserProjectDTO) {
    const project = projectRepo.findOneBy({
        id: addUser.projectId
    })
    if (!project) throw new NotFound('Project not found');
    await userRepo.update(
        { id: In(addUser.userId) },
        { projectId: addUser.projectId },
    )
}