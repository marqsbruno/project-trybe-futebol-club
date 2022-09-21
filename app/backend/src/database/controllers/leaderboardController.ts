import { Request, Response } from 'express';
import LeaderboardAwayService from '../services/leaderboardAwayService';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
    private leaderboardAwayService = new LeaderboardAwayService(),
  ) { }

  public getAllHome = async (_req: Request, res: Response) => {
    const teams = await this.leaderboardService.getHomeLeaderboard();
    console.log(teams);
    return res.status(200).json(teams);
  };

  public getAllAway = async (_req: Request, res: Response) => {
    const teams = await this.leaderboardAwayService.getAwayLeaderboard();
    console.log(teams);
    return res.status(200).json(teams);
  };
}
