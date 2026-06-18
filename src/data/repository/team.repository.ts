import { Op } from 'sequelize';
import { Team, User } from '../models';

export class TeamRepository {
    async createTeam(data: any) {
        return Team.create(data);
    }

    async addUsersToTeam(team: Team, userIds: string[]) {
        return team.addUsers(userIds);
    }

    async setOwner(team: Team, ownerId: string) {
        return team.setOwner(ownerId);
    }

    async findTeamsByOwnerId(ownerId: string) {
        const user = await User.findByPk(ownerId);
        return user?.getOwnerTeam({
            include: [{ model: User }, 'owner', 'projects']
        });
    }

    async findTeamsByUserId(userId: string) {
        const user = await User.findByPk(userId);
        return user?.getTeams({
            include: [User, 'owner', 'projects'],
            where: {
                owner_id: {
                    [Op.ne]: user?.id
                }
            }
        });
    }

     async findTeamById(teamId: number) {
        return Team.findByPk(teamId);
    }

    async updateTeam(team: Team, data: any) {
        return team.update(data);
    }

    async setUsers(team: Team, userIds: string[]) {
        return team.setUsers(userIds);
    }

    async deleteTeam(team: Team) {
       return team.destroy();
    }
}