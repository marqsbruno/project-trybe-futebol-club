import Matches from '../models/matches';
import Teams from '../models/teams';

export default class LeaderboardService {
  public getHomeLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll({ where: { inProgress: false } });

    const result = await teams.map((team) => {
      const teamMatches = matches.filter((match) => team.id === match.homeTeam);
      return {
        name: team.teamName,
        totalPoints: this.countPoints(teamMatches),
        totalGames: teamMatches.length,
        totalVictories: this.countVictories(teamMatches),
        totalDraws: this.countDraws(teamMatches),
        totalLosses: this.countLosses(teamMatches),
        goalsFavor: this.countGoalsFavor(teamMatches),
        goalsOwn: this.countGoalsOwn(teamMatches),
        goalsBalance: this.countGoalsFavor(teamMatches) - this.countGoalsOwn(teamMatches),
        efficiency: ((this.countPoints(teamMatches) / (teamMatches.length * 3)) * 100).toFixed(2),
      };
    });
    return result;
    // mandar as partidas filtradas já evitando um filter para cada conta;
  };

  public countPoints = (matches: Matches[]) => {
    let countPoints = 0;
    matches.forEach((m) => {
      if (m.homeTeamGoals > m.awayTeamGoals) countPoints += 3;
      if (m.homeTeamGoals === m.awayTeamGoals) countPoints += 1;
    });
    return countPoints;
  };

  // public countGames = (matches: Matches[]) => matches.length;

  public countVictories = (matches: Matches[]) => {
    let countVictories = 0;
    matches.forEach((m) => {
      if (m.homeTeamGoals > m.awayTeamGoals) countVictories += 1;
    });
    return countVictories;
  };

  public countDraws = (matches: Matches[]) => {
    let countDraws = 0;
    matches.forEach((m) => {
      if (m.homeTeamGoals === m.awayTeamGoals) countDraws += 1;
    });
    return countDraws;
  };

  public countLosses = (matches: Matches[]) => {
    let countLosses = 0;
    matches.forEach((m) => {
      if (m.homeTeamGoals < m.awayTeamGoals) countLosses += 1;
    });
    return countLosses;
  };

  public countGoalsFavor = (matches: Matches[]) => {
    let countGoals = 0;
    matches.forEach((m) => {
      countGoals += m.homeTeamGoals;
    });
    return countGoals;
  };

  public countGoalsOwn = (matches: Matches[]) => {
    let countGoals = 0;
    matches.forEach((m) => {
      countGoals += m.awayTeamGoals;
    });
    return countGoals;
  };
}
