import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Decoded from '../interfaces/Decoded';

const secret = process.env.JWT_SECRET || 'jwt_secret';
const tokenErrorMessage = 'Token must be a valid token';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: tokenErrorMessage });
    }
    const decoded = verify(token, secret) as Decoded;
    if (!decoded.email) return res.status(401).json({ message: tokenErrorMessage });
    next();
  } catch (e) {
    return res.status(401).json({ message: tokenErrorMessage });
  }
};
