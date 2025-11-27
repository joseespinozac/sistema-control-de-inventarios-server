import { Project, Task, Team, TeamMember, User } from "../models";

export class ProjectRepository {
    async createProject(data: any) {
        return Project.create(data);
    }

    async findProjectById(projectId: number) {
        return await Project.findByPk(projectId,
            {include: [
                {model: Task, as: 'tasks', include: ['status', 'creator', 'assignee']},
                {model: Team, as: 'team', include: ['owner',]},
            ]}
        );
    }

    async getTeam(project: Project) {
        return project.getTeam();
    }

    async getProjectTeamMembers(team: Team) {
        return team.getUsers({
            joinTableAttributes: []
        });
    }
}