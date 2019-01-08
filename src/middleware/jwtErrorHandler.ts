import { Request, RequestHandler, Response, NextFunction } from 'express';

export function jwtErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    if (err.name === 'UnauthorizedError') {
      throw new Error('Invalid JWT');
    }
  } catch (e) {
    next(e);
  }
}
