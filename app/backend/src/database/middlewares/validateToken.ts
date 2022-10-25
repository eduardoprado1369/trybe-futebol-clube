import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = verify(token, secret);
    console.log(decoded);
    req.body.userRole = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
