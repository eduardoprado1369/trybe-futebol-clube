import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400)
      .json({ message: 'All fields must be filled' });
  }
  next();
};
