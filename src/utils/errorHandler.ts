import { Response } from 'express';
import { CustomError } from '../errors/CustomError';

export const handleControllerError = (error: unknown, res: Response) => {
  const err = error as CustomError;
  res.status(err.statusCode || 500).json({ message: err.message || 'Internal server error' });
};