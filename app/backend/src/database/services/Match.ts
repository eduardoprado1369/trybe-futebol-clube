import IMatch from '../interfaces/Match';
import INewMatch from '../interfaces/NewMatch';
import IUpdateMatch from '../interfaces/UpdateMatch';
import Matches from '../models/Match';
import Teams from '../models/Team';
import calculateGoalsFavor from '../utils.ts/calculateGoalsFavor';
import calculateGoalsOwn from '../utils.ts/calculateGoalsOwn';
import calculateTotalDraws from '../utils.ts/calculateTotalDraws';
import calculatePoints from '../utils.ts/calculateTotalGoals';
import calculateTotalLosses from '../utils.ts/calculateTotalLosses';
import calculateTotalMatches from '../utils.ts/calculateTotalMatches';
import calculateTotalVictories from '../utils.ts/calculateTotalVictories';

export default class MatchService {
  static async findAllMatches(): Promise<IMatch[]> {
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
    return newMatch;
  }

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

  static async getLeaderboards() {
    const allTeamNames = await Teams.findAll();
    const leaderboards = await Promise.all(allTeamNames.map(async (i) => ({
      name: i.teamName,
      totalPoints: await calculatePoints(i.id),
      totalGames: await calculateTotalMatches(i.id),
      totalVictories: await calculateTotalVictories(i.id),
      totalDraws: await calculateTotalDraws(i.id),
      totalLosses: await calculateTotalLosses(i.id),
      goalsFavor: await calculateGoalsFavor(i.id),
      goalsOwn: await calculateGoalsOwn(i.id),
      goalsBalance: await calculateGoalsFavor(i.id) - await calculateGoalsOwn(i.id),
    })));
    console.log(leaderboards);
    return leaderboards;
  }
}
//  const allTeamNames = await Teams.findAll({ attributes: ['teamName'] });
