import { NextFunction } from 'express';
import { Result } from 'express-validator/check';

export const validationHandler = (next: NextFunction) => (result: Result) => {
  if (result.isEmpty()) {
    return;
  }
  if (!next) {
    throw new Error(
      result.array().map(i => `${i.param} has ${i.msg}`).join(' ')
    );
  } else {
    return next(
      new Error(
        result
          .array()
          .map(i => `'${i.param}' has ${i.msg}`)
          .join('')
      )
    );
  }
};
