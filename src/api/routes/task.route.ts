import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { asyncHandler } from '../wrappers/asyncHandler';

const TaskRouter = Router();
const taskController = new TaskController();

TaskRouter.post('/', asyncHandler(taskController.createTask));
TaskRouter.put('/', asyncHandler(taskController.updateTask));
TaskRouter.delete('/', asyncHandler(taskController.deleteTask));
TaskRouter.post('/comment', asyncHandler(taskController.addCommentToTask));
TaskRouter.get('/comments', asyncHandler(taskController.getCommentsByTaskId));

export default TaskRouter;