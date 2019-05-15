import { NextFunction } from 'express';
import { Result } from 'express-validator/check';

export const validationHandler = (next: NextFunction) => (result: Result) => {
  if (result.isEmpty()) {
    return;
  }
};
