import { NewCommentDto, NewTaskDto, UpdateTaskDto } from "../../api/interfaces/request_dto/task.dto";
import { NotFoundError } from "../../errors/NotFoundError";
import { StringUtil } from "../../utils/string.util";
import { Task } from "../models";
import { CommentRepository } from "../repository/comment.repository";
import { TaskRepository } from "../repository/task.repository";
import { UserRepository } from "../repository/user.repository";

export class TaskService {
    private readonly taskRepository: TaskRepository;
    private readonly userRepository: UserRepository;
    private readonly commentRepository: CommentRepository;
  
    constructor() {
      this.taskRepository = new TaskRepository();
      this.commentRepository = new CommentRepository();
      this.userRepository = new UserRepository();
    }
  
    async createTask(newTask: NewTaskDto): Promise<Task> {
      const task = await this.taskRepository.createTask(newTask);
      task.setStatus(1);
      if(newTask.creatorId) {
        await task.setCreator(String(newTask.creatorId));
      }
      if(newTask.assignedId) {
        await task.setAssignee(newTask.assignedId);
      }
      if(newTask.projectId) {
        await task.setProject(newTask.projectId);
      }
      return task;
    }
  
    async updateTask(taskId: number, data: UpdateTaskDto) {
      const task = await this.taskRepository.findTaskById(taskId);
      if (!task) {
        throw new NotFoundError('Task not found');
      }
      if(data.assignedId) {
        await task.setAssignee(data.assignedId);
      }

      if(data.statusId) { 
        await task.setStatus(StringUtil.parseStringToNumber(data.statusId));
      }
      return this.taskRepository.updateTask(task, data);
    }
  
    async deleteTask(taskId: number) {
      const task = await this.taskRepository.findTaskById(taskId);
      if (!task) {
        throw new NotFoundError('Task not found');
      }
      return this.taskRepository.deleteTask(task);
    }
  
    async addCommentToTask(newComment: NewCommentDto) {
      const task = await this.taskRepository.findTaskById(newComment.taskId);
      const ownerId = await this.userRepository.findUserById(newComment.ownerId);
      if (!task) {
        throw new NotFoundError('Task not found');
      }
      if (!ownerId) {
        throw new NotFoundError('User not found');
      }
      const comment = await this.commentRepository.createComment({
        commentText: newComment.commentText,
      });
      comment.setTask(newComment.taskId);
      comment.setOwner(String(newComment.ownerId));
      return comment;
    }
  
    async getCommentsByTaskId(taskId: number) {
      const task = await this.taskRepository.findTaskById(taskId);
      if (!task) {
        throw new NotFoundError('Task not found');
      }
      return this.taskRepository.getCommentsByTaskId(taskId);
    }
  }