import { Request, Response, NextFunction } from 'express';

export const validateId = (paramName: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    if (!id || typeof id !== 'string') {
      res.status(400).json({ message: `Invalid or missing ${paramName}` });
      return;
    }
    next(); // Continue le traitement
  };
};
