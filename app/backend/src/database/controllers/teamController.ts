import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamById = await this.teamService.getById(Number(id));
    return res.status(200).json(teamById);
  };
}
