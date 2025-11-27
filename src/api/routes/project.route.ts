import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { asyncHandler } from "../wrappers/asyncHandler";

const ProjectRouter = Router();
const projectController = new ProjectController();

ProjectRouter.post('/', asyncHandler(projectController.createProject));
ProjectRouter.get('/', asyncHandler(projectController.getProject));

export default ProjectRouter;