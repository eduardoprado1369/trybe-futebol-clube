import Matches from '../models/Match';
import Teams from '../models/Team';

export default class MatchService {
  static async findAllMatches() {
    const teams = await Matches.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }],
    });
    return teams;
  }
}
// include: [{ model: Teams, as: 'homeTeam' },
// { model: Teams, as: 'awayTeam' }],
