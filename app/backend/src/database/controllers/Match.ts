import { Request, Response } from 'express';
import MatchService from '../services/Match';

export default class MatchController {
  static async findAllMatches(req: Request, res: Response) {
    console.log(req.query);
    if (req.query.inProgress) {
      const isInProgress = req.query.inProgress;
      if (isInProgress) {
        const matches = await MatchService.findInProgressMatches();
        return res.status(200).json(matches);
      }
      if (!isInProgress) {
        const matches = await MatchService.findFinishedMatches();
        return res.status(200).json(matches);
      }
    }

    const matches = await MatchService.findAllMatches();
    res.status(200).json(matches);
  }
}
