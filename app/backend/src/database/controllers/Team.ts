import { Request, Response } from 'express';
import TeamService from '../services/Team';

// const fieldsMissingMessage = 'All fields must be filled';
export default class TeamController {
  static async findAllTeams(_req: Request, res: Response) {
    const allTeams = await TeamService.findAllTeams();
    res.status(200).json(allTeams);
  }

  static async findTeam(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.findTeam(Number(id));
    res.status(200).json(team);
  }
}
