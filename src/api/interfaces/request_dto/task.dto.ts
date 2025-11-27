export interface NewCommentDto {
    commentText: string;
    ownerId: number;
    taskId: number;
}

export interface NewTaskDto {
    name: string;
    description: string;
    beginDate: string;
    endDate: string;
    assignedId: string;
    projectId: number;
    creatorId: number;
}

export interface UpdateTaskDto {
    description: string;
    beginDate: string;
    endDate: string;
    assignedId: string;
    statusId: string;
}