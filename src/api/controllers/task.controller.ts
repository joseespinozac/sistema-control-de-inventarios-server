import { Request, Response } from "express";
import { TaskService } from "../../data/services/task.service";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { BadRequestError } from "../../errors/BadRequestError";
import { handleControllerError } from "../../utils/errorHandler";
import { Task } from "../../data/models";
import { NewCommentDto, NewTaskDto, UpdateTaskDto } from "../interfaces/request_dto/task.dto";
import { StringUtil } from "../../utils/string.util";

export class TaskController {
  private readonly taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (req: Request, res: Response) => {
    try {
      const requestBody: NewTaskDto = req.body;
      const newTask: Task = await this.taskService.createTask(req.body);
      res.status(201).json({ message: "Task created", data: newTask } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const taskId = StringUtil.parseStringToNumber(req.query.taskId as string);
      if (isNaN(taskId)) {
        throw new BadRequestError('Invalid task ID');
      }
      const requestBody: UpdateTaskDto = req.body;
      const updatedTask = await this.taskService.updateTask(taskId, requestBody);
      res.status(200).json({ message: "Task updated", data: updatedTask } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.query.taskId as string);
      if (isNaN(taskId)) {
        throw new BadRequestError('Invalid task ID');
      }
      await this.taskService.deleteTask(taskId);
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      handleControllerError(error, res);
    }
  };

  addCommentToTask = async (req: Request, res: Response) => {
    try {
      const requestBody: NewCommentDto = req.body;
      const comment = await this.taskService.addCommentToTask(requestBody);
      res.status(201).json({ message: 'Comment created', data: comment } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };

  getCommentsByTaskId = async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.query.taskId as string);
      if (isNaN(taskId)) {
        throw new BadRequestError('Invalid task ID');
      }
      const comments = await this.taskService.getCommentsByTaskId(taskId);
      res.status(200).json({ message: 'Comments found', data: comments } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };
}