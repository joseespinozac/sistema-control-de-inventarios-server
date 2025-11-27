import { NewProjectDto } from "../../api/interfaces/request_dto/project.dto";
import { NotFoundError } from "../../errors/NotFoundError";
import { StringUtil } from "../../utils/string.util";
import { Project } from "../models";
import { ProjectRepository } from "../repository/project.repository";

export class ProjectService {
    private readonly projectRepository: ProjectRepository;

    constructor() {
        this.projectRepository = new ProjectRepository();
    }

    async createProject(newProject: NewProjectDto): Promise<Project> {
        const project = await this.projectRepository.createProject(newProject);
        if (newProject.teamId) {
            project.setTeam(StringUtil.parseStringToNumber(newProject.teamId));
        }
        return project;
    }

    async getProject(projectId: number): Promise<Project> {
        const project = await this.projectRepository.findProjectById(projectId);
        if (!project) {
            throw new NotFoundError("Project not found");
        }

        const team = await this.projectRepository.getTeam(project);
        const members = await this.projectRepository.getProjectTeamMembers(
            team
        );

        project.setDataValue("members", members);
        return project;
    }
}
