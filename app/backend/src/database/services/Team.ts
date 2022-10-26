import Teams from '../models/Team';

export default class TeamService {
  static async findAllTeams() {
    const teams = await Teams.findAll();
    return teams;
  }

  static async findTeam(id: number) {
    const team = await Teams.findByPk(id);
    return team;
  }
}
