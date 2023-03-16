export class CreateTaskDTO {
    name: string
    description: string
    projectId: number
    status: number
}

export class UpdateTaskDTO {
    name?: string
    description?: string
    status?: number
}