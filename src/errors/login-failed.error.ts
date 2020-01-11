import { BaseError } from './Base.error';

export class LoginFailedError extends BaseError {
  constructor(message: string = 'login.failed', status: number = 401) {
    super(message, status);
  }
}
