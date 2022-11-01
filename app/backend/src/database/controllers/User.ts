import { Request, Response } from 'express';
import UserService from '../services/User';

export default class UserController {
  static async findUser(req: Request, res: Response) {
    const login = req.body;

    const token = await UserService.findUser(login);
    if (typeof token === 'object') {
      return res.status(401)
        .json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ token });
  }
}
