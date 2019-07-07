import { RequestHandler, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '@/errors';

/**
 * Validation middleware for simple validation errors: ex username.isRequired, etc.
 * @param type The DTO class to validate
 */
export function validationMiddleware<T>(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const validationErrors = errors.map((error: ValidationError) => {
          return {
            field: error.property,
            // Only return the first error for each field
            message: Object.values(error.constraints)[0]
          };
        });
        next(new ValidationException(400, 'validation.failed', validationErrors));
      } else {
        next();
      }
    });
  };
}
