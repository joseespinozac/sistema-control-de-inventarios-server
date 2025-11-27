import { Request, Response } from "express";
import { TeamService } from "../../data/services/team.service";
import { ResponsePayload } from "../interfaces/response_dto/ResponsePayload.interface";
import { handleControllerError } from "../../utils/errorHandler";

export class TeamController {
  private readonly teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  createTeam = async (req: Request, res: Response) => {
    try {
      const requestBody = req.body;
      const newTeam = await this.teamService.createTeam(requestBody);
      res.status(201).json({
        message: "Team created",
        data: newTeam,
      } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };

  getTeamsOwnedByUser = async (req: Request, res: Response) => {
    try {
      const teams = await this.teamService.getTeamsOwnedByUser(
        req.query.owner_id as string
      );
      res.status(200).json({
        message: "Teams owned by user found",
        data: teams,
      } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };

  getTeamsCollaboratedByUser = async (req: Request, res: Response) => {
    try {
      const teams = await this.teamService.getTeamsCollaboratedByUser(
        req.query.user_id as string
      );
      res.status(200).json({
        message: "Teams where user is assigned found",
        data: teams,
      } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };

  updateTeam = async (req: Request, res: Response) => {
    try {
      const teamId = parseInt(req.query.team_id as string);
      const requestBody = req.body;
      const updatedTeam = await this.teamService.updateTeam(
        teamId,
        requestBody
      );
      res
        .status(200)
        .json({
          message: "Team updated",
          data: updatedTeam,
        } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };

  deleteTeam = async (req: Request, res: Response) => {
    try {
      const teamId = parseInt(req.query.team_id as string);
      await this.teamService.deleteTeam(teamId);
      res.status(200).json({ message: "Team deleted" } as ResponsePayload);
    } catch (error) {
      handleControllerError(error, res);
    }
  };
}
