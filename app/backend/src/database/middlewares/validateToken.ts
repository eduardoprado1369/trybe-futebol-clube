import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import Decoded from '../interfaces/Decoded';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = verify(token, secret) as Decoded;
    res.status(200).json({ role: decoded.role });
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
