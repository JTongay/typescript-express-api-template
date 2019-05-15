import { Request, RequestHandler, Response, NextFunction } from 'express';
import { UnauthorizedError, ErrorValue } from '@/errors';

export function jwtErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err.name === ErrorValue.Unauthorized) {
    throw new UnauthorizedError();
  }
  next(err);
}
