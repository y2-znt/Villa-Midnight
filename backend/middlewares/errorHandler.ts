import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log de l'erreur pour le développeur
  res.status(500).json({ message: err.message });
};
