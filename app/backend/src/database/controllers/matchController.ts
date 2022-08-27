import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };
}
