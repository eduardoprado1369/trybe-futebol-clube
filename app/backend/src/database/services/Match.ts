import Matches from '../models/Match';
import Teams from '../models/Team';

export default class MatchService {
  static async findAllMatches() {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }],
    });
    return matches;
  }

  static async findInProgressMatches() {
    const matches = await Matches.findAll({ where: { inProgress: true } });
    return matches;
  }

  static async findFinishedMatches() {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    return matches;
  }
}
