import Matches from '../models/matches';
import Teams from '../models/teams';

/* interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
} */

/* interface IMatches {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgres: boolean
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
 */
export default class LeaderboardService {
  public countPoints = (matches: Matches[]) => {
    let countPoints = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) countPoints += 3;
      if (match.homeTeamGoals === match.awayTeam) countPoints += 1;
    });
    return countPoints;
  };

  public countGames = (matches: Matches[]) => matches.length;

  public getLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll({ where: { inProgress: false } });

    const result = await teams.map((team) => {
      const teamMatches = matches.filter((elem) => team.id === elem.homeTeam);
      return {
        name: team.teamName,
        totalPoints: this.countPoints(teamMatches),
        totalGames: this.countGames(teamMatches),
      };
    });
    return result;
    // mandar as partidas filtradas já evitando um filter em cada conta
  };
}
