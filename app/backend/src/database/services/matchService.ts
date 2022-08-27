import Matches from '../models/matches';
import Teams from '../models/teams';

export default class MatchService {
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
    console.log(matches);
    return matches;
  };
}
