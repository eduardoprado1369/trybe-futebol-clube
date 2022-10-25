import { Request, Response } from 'express';
import UserService from '../services/User';

const fieldsMissingMessage = 'All fields must be filled';

export default class UserController {
  static async findUser(req: Request, res: Response) {
    if (!req.body.email) return res.status(400).json({ message: fieldsMissingMessage });
    if (!req.body.password) return res.status(400).json({ message: fieldsMissingMessage });
    const login = req.body;

    const token = await UserService.findUser(login);
    if (typeof token === 'object') {
      return res.status(401)
        .json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ token });
  }

  static async findUserRole(req: Request, res: Response) {
    const login = req.body;
    const role = await UserService.findUserRole(login);
    if (typeof role === 'object') {
      return res.status(401)
        .json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ role });
  }
}
