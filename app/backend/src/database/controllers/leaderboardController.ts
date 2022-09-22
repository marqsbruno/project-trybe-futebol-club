import { Request, Response } from 'express';
import LeaderboardAllService from '../services/leaderboardAllService';
import LeaderboardAwayService from '../services/leaderboardAwayService';
import LeaderboardHomeService from '../services/leaderboardHomeService';

export default class LeaderboardController {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeService(),
    private leaderboardAwayService = new LeaderboardAwayService(),
    private leaderboardAllService = new LeaderboardAllService(),
  ) { }

  public getAllHome = async (_req: Request, res: Response) => {
    const teams = await this.leaderboardHomeService.getHomeLeaderboard();
    // console.log(teams);
    return res.status(200).json(teams);
  };

  public getAllAway = async (_req: Request, res: Response) => {
    const teams = await this.leaderboardAwayService.getAwayLeaderboard();
    // console.log(teams);
    return res.status(200).json(teams);
  };

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.leaderboardAllService.getLeaderboard();
    console.log(teams);
    return res.status(200).json(teams);
  };
}
