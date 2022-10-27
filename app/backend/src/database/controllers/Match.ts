import { Request, Response } from 'express';
import MatchService from '../services/Match';

export default class MatchController {
  static async findAllMatches(_req: Request, res: Response) {
    const allMatches = await MatchService.findAllMatches();
    res.status(200).json(allMatches);
  }
}
