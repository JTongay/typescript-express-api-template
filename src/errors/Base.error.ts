interface ValidationError {
  field: string;
  message: string;
}

export class BaseError extends Error {
  statusCode: number;
  message: string;
  validation: ValidationError[];
  constructor(
    message: string = 'error.service',
    statusCode: number = 500,
    validation: any = undefined
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    this.validation = validation;
  }
}
