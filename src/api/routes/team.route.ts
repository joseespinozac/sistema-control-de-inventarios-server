import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { asyncHandler } from '../wrappers/asyncHandler';

const TeamsRouter = Router();
const teamController = new TeamController();

TeamsRouter.post('/', asyncHandler(teamController.createTeam));
TeamsRouter.get('/owned', asyncHandler(teamController.getTeamsOwnedByUser));
TeamsRouter.get('/collab', asyncHandler(teamController.getTeamsCollaboratedByUser));
TeamsRouter.put('/', asyncHandler(teamController.updateTeam));
TeamsRouter.delete('/', asyncHandler(teamController.deleteTeam));

export default TeamsRouter;