import { Request, Response } from 'express';
import Teams from '../models/teams';
import JwtService from '../services/jwtService';
import MatchService from '../services/matchService';

// const jwtService = new JwtService();

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
    private jwtService = new JwtService(),
  ) { }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const match = req.body;
    const { homeTeam, awayTeam } = match;
    const { authorization } = req.headers;

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    // não é de bom tom isso aqui em
    const home = await Teams.findByPk(homeTeam);
    const away = await Teams.findByPk(awayTeam);
    if (!home || !away) return res.status(404).json({ message: 'There is no team with such id!' });

    const verifyToken = await this.jwtService.verifyToken(authorization as string);
    if (!verifyToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const newMatch = await this.matchService.createMatch(match);
    return res.status(201).json(newMatch);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.updateMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateScore = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this.matchService.updateScore(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(result);
  };
}
