import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import UserService from '../services/User';

export default class UserController {
  static async findUser(req: Request, res: Response) {
    if (!req.body.email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!req.body.password) return res.status(400).json({ message: 'All fields must be filled' });
    const encryptedPassword = await hash(req.body.password, 10);
    const login = { email: req.body.email, password: encryptedPassword };

    const token = await UserService.findUser(login);
    if (typeof token === 'object') {
      return res.status(401)
        .json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json(token);
  }
}
