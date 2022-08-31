import Matches from '../models/matches';
import Teams from '../models/teams';

/* interface MatchInt {
  homeTeam: number;
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
} */

export default class MatchService {
  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

  public getAll = async () => {
    const matches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
      }, {
        model: Teams,
        as: 'teamAway',
      }],
    });
    // console.log(matches);
    return matches;
  };

  public createMatch = async (match: Matches) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = match;

    const newMatch = await Matches.create({ homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true });
    return newMatch;
  };

  public updateMatch = async (id: number) => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };

  public updateScore = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const update = await Matches.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
    return update;
  };
}
