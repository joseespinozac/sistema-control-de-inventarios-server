import { Request, Response } from "express";
import { ProjectService } from "../../data/services/project.service";
import { handleControllerError } from "../../utils/errorHandler";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { NewProjectDto } from "../interfaces/request_dto/project.dto";

export class ProjectController {
    private readonly projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    createProject = async (req: Request, res: Response) => {
        try {
            const requestBody: NewProjectDto = req.body;
            const newProject = await this.projectService.createProject(requestBody);
            res.status(201).json({
                message: 'Project created',
                data: newProject
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
        
    }

    getProject = async (req: Request, res: Response) => {
        try {
            const projectId = parseInt(req.query.project_id as string);
            const project = await this.projectService.getProject(projectId);
            res.status(200).json({
                message: 'Project found',
                data: project
            } as ResponsePayload);
        } catch (error) {
            handleControllerError(error, res);
        }
        
    }
}