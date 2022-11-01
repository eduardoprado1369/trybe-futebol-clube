import { Request, Response, NextFunction } from 'express';

const fieldsMissingMessage = 'All fields must be filled';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    return res.status(400).json({ message: fieldsMissingMessage });
  }
  if (!req.body.email.includes('@') || !req.body.email.includes('.com')) {
    return res.status(400).json({ message: fieldsMissingMessage });
  }
  next();
};
