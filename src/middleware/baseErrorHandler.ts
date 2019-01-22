import { BaseError } from '@/errors';
import { Request, Response, NextFunction } from 'express';
import { logger } from '@/services';

export function baseErrorHandler(
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
  ): void {
    logger.info(error);
    if (!res.headersSent) {
      res.status(error.status || 500).json({ error });
    } else {
      next(error);
    }
  }
