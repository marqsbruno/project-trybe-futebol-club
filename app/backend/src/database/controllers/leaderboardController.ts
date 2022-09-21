import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public getAllHome = async (_req: Request, res: Response) => {
    const teams = await this.leaderboardService.getHomeLeaderboard();
    console.log(teams);
    return res.status(200).json(teams);
  };
}
