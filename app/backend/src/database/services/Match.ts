import ILeaderboard from '../interfaces/Leaderboard';
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
import orderLeaderboard from '../utils.ts/orderLeaderboard';

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
    return match;
  }

  static async updateMatch(id:number, goals: IUpdateMatch) {
    const { homeTeamGoals, awayTeamGoals } = goals;
    const match = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return match;
  }

  static async getLeaderboards(type: string) {
    const allTeamNames = await Teams.findAll();
    const leaderboard: ILeaderboard[] = await Promise.all(allTeamNames.map(async (i) => ({
      name: i.teamName,
      totalPoints: await calculatePoints(i.id, type),
      totalGames: await calculateTotalMatches(i.id, type),
      totalVictories: await calculateTotalVictories(i.id, type),
      totalDraws: await calculateTotalDraws(i.id, type),
      totalLosses: await calculateTotalLosses(i.id, type),
      goalsFavor: await calculateGoalsFavor(i.id, type),
      goalsOwn: await calculateGoalsOwn(i.id, type),
      goalsBalance: await calculateGoalsFavor(i.id, type) - await calculateGoalsOwn(i.id, type),
      efficiency: Number(((await calculatePoints(i
        .id, type) / (await calculateTotalMatches(i.id, type) * 3)) * 100)
        .toFixed(2)),
    })));
    const finalLeaderboard = orderLeaderboard(leaderboard);
    return finalLeaderboard;
  }
}
