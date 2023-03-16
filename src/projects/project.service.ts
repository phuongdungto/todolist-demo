import { AppDataSource } from "../core/database";
import { Project } from "./project.entity";
import { BadRequest, Unauthorized, NotFound } from 'http-errors';
import { CreateProjectDTO, UpdateProjectDTO } from "./project.dto";
import { pagination } from "../core/interfaces/pagination.interface";
import { Pagination } from "../core/utils/pagination.util";

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

export async function getProjects(pagination: pagination) {
    const query = Pagination(Project, pagination);
    const [list, count] = await projectRepo.findAndCount({
        ...query,
        // relations: {
        //     users: true
        // }
    })

    return { totalPages: Math.ceil(count / pagination.limit), projects: list };
}

export async function getProject(id: number) {
    const project = await projectRepo.findOne({
        where: { id: id },
        relations: {
            // users: true,
            tasks: true
        }
    })
    if (!project)
        throw new NotFound('Project not found');
    return project;
}
