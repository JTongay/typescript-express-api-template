import { BaseError } from './Base.error';

export class UnauthorizedError extends BaseError {
  constructor(message: string = 'auth.unauthorized', status: number = 401) {
    super(message, status);
  }
}
