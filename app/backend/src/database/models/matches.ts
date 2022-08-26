import { BOOLEAN, INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: STRING,
      allowNull: false,
    },
    homeTeamGoals: {
      type: STRING,
      allowNull: false,
    },
    awayTeam: {
      type: STRING,
      allowNull: false,
    },
    awayTeamGoals: {
      type: STRING,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });

Teams.belongsTo(Matches, { foreignKey: 'homeTeam', as: 'id' });
Teams.belongsTo(Matches, { foreignKey: 'awayTeam', as: 'id' });

export default Matches;
