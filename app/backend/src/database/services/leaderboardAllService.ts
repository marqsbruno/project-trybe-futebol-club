import ILeaderboard from '../interfaces/Ileaderboard';
import Matches from '../models/matches';
import Teams from '../models/teams';
import LeaderboardAwayService from './leaderboardAwayService';
import LeaderboardHomeService from './leaderboardHomeService';

// juntei os 2 services, não é de bom tom mas funcionou;

export default class LeaderboardAllService {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeService(),
    private leaderboardAwayService = new LeaderboardAwayService(),
  ) {}

  public getLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const result = await teams.map((team) => {
      const hMatch = matches.filter((match) => team.id === match.homeTeam);
      const aMatch = matches.filter((match) => team.id === match.awayTeam);
      return { name: team.teamName,
        totalPoints: this.countPoints(hMatch, aMatch),
        totalGames: this.countGames(hMatch, aMatch),
        totalVictories: this.countVictories(hMatch, aMatch),
        totalDraws: this.countDraws(hMatch, aMatch),
        totalLosses: this.countLosses(hMatch, aMatch),
        goalsFavor: this.countGoalsFavor(hMatch, aMatch),
        goalsOwn: this.countGoalsOwn(hMatch, aMatch),
        goalsBalance: this.countBalance(hMatch, aMatch),
        efficiency: this.efficiency(hMatch, aMatch) };
    });
    const sortResult = this.sortLeaderboard(result);
    return sortResult;
  };

  // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/

  public sortLeaderboard = (leaderboard: ILeaderboard[]) => {
    const sorted = leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

    return sorted;
  };

  public countPoints = (hMatch: Matches[], aMatch: Matches[]) => {
    const hResult = this.leaderboardHomeService.countPoints(hMatch);
    const aResult = this.leaderboardAwayService.countPoints(aMatch);
    const points = hResult + aResult;
    return points;
  };

  public countGames = (hMatch: Matches[], aMatch: Matches[]) => {
    const games = hMatch.length + aMatch.length;
    return games;
  };

  public countVictories = (hMatch: Matches[], aMatch: Matches[]) => {
    const hResult = this.leaderboardHomeService.countVictories(hMatch);
    const aResult = this.leaderboardAwayService.countVictories(aMatch);
    const victories = hResult + aResult;
    return victories;
  };

  public countDraws = (hMatch: Matches[], aMatch: Matches[]) => {
    const hResult = this.leaderboardHomeService.countDraws(hMatch);
    const aResult = this.leaderboardAwayService.countDraws(aMatch);
    const draws = hResult + aResult;
    return draws;
  };

  public countLosses = (hMatch: Matches[], aMatch: Matches[]) => {
    const hResult = this.leaderboardHomeService.countLosses(hMatch);
    const aResult = this.leaderboardAwayService.countLosses(aMatch);
    const losses = hResult + aResult;
    return losses;
  };

  public countGoalsFavor = (hMatch: Matches[], aMatch: Matches[]) => {
    const hResult = this.leaderboardHomeService.countGoalsFavor(hMatch);
    const aResult = this.leaderboardAwayService.countGoalsFavor(aMatch);
    const goals = hResult + aResult;
    return goals;
  };

  public countGoalsOwn = (hMatch: Matches[], aMatch: Matches[]) => {
    const hResult = this.leaderboardHomeService.countGoalsOwn(hMatch);
    const aResult = this.leaderboardAwayService.countGoalsOwn(aMatch);
    const goals = hResult + aResult;
    return goals;
  };

  public countBalance = (hMatch: Matches[], aMatch: Matches[]) => {
    const result = this.countGoalsFavor(hMatch, aMatch) - this.countGoalsOwn(hMatch, aMatch);
    return result;
  };

  public efficiency = (hMatch: Matches[], aMatch: Matches[]) => {
    const games = this.countGames(hMatch, aMatch);
    const result = Number(((this.countPoints(hMatch, aMatch) / (games * 3)) * 100).toFixed(2));
    return result;
  };
}
