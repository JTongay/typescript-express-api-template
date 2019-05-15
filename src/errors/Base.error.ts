export class BaseError extends Error {
  statusCode: number;
  constructor(message: string = 'error.service', statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    // Error.captureStackTrace(this, this.constructor);
    this.statusCode = statusCode;
  }
}
