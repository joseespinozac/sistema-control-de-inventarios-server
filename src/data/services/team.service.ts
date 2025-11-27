import { NewTeamDto, UpdateTeamDto } from '../../api/interfaces/request_dto/team.dto';
import { TeamRepository } from '../repository/team.repository';

export class TeamService {
    private teamRepository: TeamRepository;

    constructor() {
        this.teamRepository = new TeamRepository();
    }

    async createTeam(newTeam: NewTeamDto) {
        const team = await this.teamRepository.createTeam(newTeam);

        if (newTeam.membersId && newTeam.membersId.length > 0) {
            await this.teamRepository.addUsersToTeam(team, newTeam.membersId);
        }

        if (newTeam.ownerId) {
            await this.teamRepository.setOwner(team, newTeam.ownerId);
        }

        return team;
    }

    async getTeamsOwnedByUser(ownerId: string) {
        return this.teamRepository.findTeamsByOwnerId(ownerId);
    }

    async getTeamsCollaboratedByUser(userId: string) {
        return this.teamRepository.findTeamsByUserId(userId);
    }

    async updateTeam(teamId: number, updateTeam: UpdateTeamDto) {
        const team = await this.teamRepository.findTeamById(teamId);
        if (!team) {
            throw new Error('Team not found');
        }

        if (updateTeam.membersId) {
            await this.teamRepository.setUsers(team, updateTeam.membersId);
        }

        return this.teamRepository.updateTeam(team, updateTeam);
    }

    async deleteTeam(teamId: number) {
        const team = await this.teamRepository.findTeamById(teamId);
        if (!team) {
            throw new Error('Team not found');
        }

        return this.teamRepository.deleteTeam(team);
    }
}