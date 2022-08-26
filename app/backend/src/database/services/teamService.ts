import Teams from '../models/teams';

export default class TeamService {
  public getAll = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  public getById = async (id: number) => {
    const teamById = await Teams.findOne({ where: { id } });
    return teamById;
  };
}
