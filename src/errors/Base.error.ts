export class BaseError extends Error {
  status: number;
  constructor(message: string = 'error.service', status: number = 500) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
  }
}
