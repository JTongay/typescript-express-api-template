import { BaseError } from '@/errors';
import { Request, Response, NextFunction } from 'express';

export function baseErrorHandler(
  error: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
  ): void {
    if (!res.headersSent) {
      res.status(error.statusCode || 500).json({
        message: error.message,
        status: error.statusCode,
        validation: error.validation
      });
    } else {
      next(error);
    }
  }
