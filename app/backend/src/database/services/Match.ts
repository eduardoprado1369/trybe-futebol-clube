import INewMatch from '../interfaces/NewMatch';
import IUpdateMatch from '../interfaces/UpdateMatch';
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
    const matches = await Matches.findAll({ where: { inProgress: true },
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }] });
    console.log(matches);
    return matches;
  }

  static async findFinishedMatches() {
    const matches = await Matches.findAll({ where: { inProgress: false },
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }] });
    return matches;
  }

  static async createMatch(match: INewMatch) {
    const newMatch = await Matches.create({ ...match, inProgress: true });
    // console.log(newMatch);
    return newMatch;
  }

  // static async createFinishedMatch(match: INewMatch) {
  //   const newMatch = await Matches.create({ ...match, inProgress: false });
  //   console.log(newMatch);
  //   return newMatch;
  // }

  static async finishMatch(id: number) {
    const match = await Matches.update({ inProgress: false }, { where: { id } });
    console.log(match);
    return match;
  }

  static async updateMatch(id:number, goals: IUpdateMatch) {
    const { homeTeamGoals, awayTeamGoals } = goals;
    const match = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    console.log(match);
    return match;
  }
}
