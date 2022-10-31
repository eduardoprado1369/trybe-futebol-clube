import { Request, Response } from 'express';
import INewMatch from '../interfaces/NewMatch';
import MatchService from '../services/Match';
import TeamService from '../services/Team';

export default class MatchController {
  static async findAllMatches(req: Request, res: Response) {
    // console.log(req.route);
    if (req.query.inProgress) {
      const isInProgress = req.query.inProgress;
      if (isInProgress === 'true') {
        const matches = await MatchService.findInProgressMatches();
        return res.status(200).json(matches);
      }
      if (isInProgress === 'false') {
        const matches = await MatchService.findFinishedMatches();
        return res.status(200).json(matches);
      }
    }

    const matches = await MatchService.findAllMatches();
    res.status(200).json(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const match: INewMatch = req.body;
    const team1 = await TeamService.findTeam(Number(req.body.homeTeam));
    const team2 = await TeamService.findTeam(Number(req.body.awayTeam));
    if (!team1 || !team2) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }
    if (match.awayTeam === match.homeTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const newMatch = await MatchService.createMatch(match);
    res.status(201).json(newMatch);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const finishedMatch = await MatchService.finishMatch(Number(id));
    if (finishedMatch) return res.status(200).json({ message: 'Finished' });
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const goals = req.body;
    const match = await MatchService.updateMatch(Number(id), goals);
    return res.status(200).json(match);
  }

  static async getAllLeaderboards(_req: Request, res: Response) {
    const leaderboards = await MatchService.getLeaderboards('all');
    res.status(200).json(leaderboards);
  }

  static async getHomeLeaderboards(_req: Request, res: Response) {
    const leaderboards = await MatchService.getLeaderboards('home');
    res.status(200).json(leaderboards);
  }

  static async getAwayLeaderboards(_req: Request, res: Response) {
    const leaderboards = await MatchService.getLeaderboards('away');
    res.status(200).json(leaderboards);
  }
}
