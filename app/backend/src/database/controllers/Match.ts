import { Request, Response } from 'express';
import INewMatch from '../interfaces/NewMatch';
import MatchService from '../services/Match';

export default class MatchController {
  static async findAllMatches(req: Request, res: Response) {
    // console.log(req.query);
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
    if (match.awayTeam === match.homeTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const newMatch = await MatchService.createMatch(match);
    res.status(201).json(newMatch);
  }

  // static async createNewFinishedMatch(req: Request, res: Response) {
  //   const match = req.body;
  //   const newMatch = await MatchService.createFinishedMatch(match);
  //   res.status(201).json(newMatch);
  // }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const finishedMatch = await MatchService.finishMatch(Number(id));
    if (finishedMatch) return res.status(200).json({ message: 'Finished' });
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
}
