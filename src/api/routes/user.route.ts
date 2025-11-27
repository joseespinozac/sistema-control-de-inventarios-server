import { Router } from 'express';
import { User } from '../../data/models';
import { Op } from 'sequelize';
import { ResponsePayload } from '../interfaces/response_dto/ResponsePayload.interface';
import { asyncHandler } from '../wrappers/asyncHandler';
import { get } from 'http';
import { UserController } from '../controllers/user.controller';

const UsersRouter = Router();
const userController = new UserController();

UsersRouter.get('/search-by-username', asyncHandler(userController.getUsersBySearchQuery));
UsersRouter.get('/by-email', asyncHandler(userController.getUserByEmail));

export default UsersRouter;