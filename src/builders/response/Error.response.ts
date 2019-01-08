import { GenericBuilder } from '@/builders';

export class ErrorResponseBuilder extends GenericBuilder {
  private status: number;
  private error_code: string[] = [];

  constructor(status: number) {
    super();
    this.status = status;
  }

  get Status(): number {
    return this.status;
  }

  get ErrorCode(): string[] {
    return this.error_code;
  }

  public setErrorCode(val: string) {
    this.error_code.push(val);
    return this;
  }

  public build(): ErrorResponse {
    return new ErrorResponse(this);
  }
}

export class ErrorResponse {
  private status: number;
  private error_code: string[];

  constructor(builder: ErrorResponseBuilder) {
    this.status = builder.Status;
    this.error_code = builder.ErrorCode;
  }

  get Status(): number {
    return this.status;
  }

  get ErrorCode(): string[] {
    return this.error_code;
  }
}
