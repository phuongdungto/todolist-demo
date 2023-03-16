import { AppDataSource } from "../core/database";
import { Project } from "./project.entity";
import { BadRequest, Unauthorized, NotFound } from 'http-errors';
import * as crypto from 'crypto';
import * as dotenv from "dotenv";
import { CreateProjectDTO, UpdateProjectDTO } from "./project.dto"

const projectRepo = AppDataSource.getRepository(Project);
export async function createProject(project: CreateProjectDTO) {
    const newProject = await projectRepo.save(project);
    if (!newProject) {
        throw new BadRequest(`Can't create project`);
    }
    return newProject;
}

export async function updateProject(id: number, project: UpdateProjectDTO) {
    const updateProject = await projectRepo.findOneBy({
        id: id
    });
    if (!updateProject) {
        throw new BadRequest(`Project not found`);
    }
    await projectRepo.update(id, project);
    return updateProject;
}
