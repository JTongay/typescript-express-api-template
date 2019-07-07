import { BaseError } from './Base.error';

/**
 * statusCode defaults to 400 for validation errors
 */
export class ValidationException extends BaseError {
  constructor(statusCode: number = 400, message: string, validation: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.validation = validation;
  }
}
