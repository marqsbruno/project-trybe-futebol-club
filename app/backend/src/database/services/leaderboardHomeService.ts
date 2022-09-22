import ILeaderboard from '../interfaces/Ileaderboard';
import Matches from '../models/matches';
import Teams from '../models/teams';

export default class LeaderboardHomeService {
  public getHomeLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll({ where: { inProgress: false } });

    // manda as partidas filtradas por times evitando um filter em cada conta

    const result = await teams.map((team) => {
      const tMatch = matches.filter((match) => team.id === match.homeTeam);
      return {
        name: team.teamName,
        totalPoints: this.countPoints(tMatch),
        totalGames: tMatch.length,
        totalVictories: this.countVictories(tMatch),
        totalDraws: this.countDraws(tMatch),
        totalLosses: this.countLosses(tMatch),
        goalsFavor: this.countGoalsFavor(tMatch),
        goalsOwn: this.countGoalsOwn(tMatch),
        goalsBalance: this.countGoalsFavor(tMatch) - this.countGoalsOwn(tMatch),
        efficiency: Number(((this.countPoints(tMatch) / (tMatch.length * 3)) * 100).toFixed(2)) };
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
