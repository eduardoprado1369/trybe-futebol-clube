import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }
  if (!req.body.email.includes('@') || !req.body.email.includes('.com')) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }
  next();
};
