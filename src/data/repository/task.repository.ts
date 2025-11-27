import { NewTaskDto } from "../../api/interfaces/request_dto/task.dto";
import { Task, Comment } from "../models";


export class TaskRepository {
    async createTask(newTask: NewTaskDto) {
        return Task.create(newTask);
    }

    async findTaskById(taskId: number) {
        return Task.findByPk(taskId);
    }

    async updateTask(task: Task, data: any) {
        return task.update(data);
    }

    async deleteTask(task: Task) {
        return task.destroy();
    }

    async addCommentToTask(taskId: number, commentData: any) {
        const task = await Task.findByPk(taskId);
        if (task) {
            const comment = await Comment.create(commentData);
            await comment.setTask(taskId);
            return comment;
        }
        throw new Error('Task not found');
    }

    async getCommentsByTaskId(taskId: number) {
        const task = await Task.findByPk(taskId);
        if (task) {
            return task.getComments({ include: ['owner'] });
        }
        throw new Error('Task not found');
    }
}