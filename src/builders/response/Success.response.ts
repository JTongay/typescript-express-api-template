import { GenericBuilder } from '@/builders';

export class SuccessResponseBuilder {
  private status: number;
  private data: GenericBuilder;
  private token: string;
  private message: string;

  constructor(status: number) {
    this.status = status;
  }

  get Status(): number {
    return this.status;
  }

  get Data(): GenericBuilder {
    return this.data;
  }

  public setData(data: GenericBuilder) {
    this.data = data;
    return this;
  }

  get Token(): string {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
    return this;
  }

  get Message(): string {
    return this.message;
  }

  public setMessage(val: string) {
    this.message = val;
    return this;
  }

  public build(): SuccessResponse {
    return new SuccessResponse(this);
  }
}

export class SuccessResponse {
  private status: number;
  private data: GenericBuilder;
  private token: string;
  private message: string;

  constructor(builder: SuccessResponseBuilder) {
    this.status = builder.Status;
    this.data = builder.Data;
    this.token = builder.Token;
    this.message = builder.Message;
  }

  get Status(): number {
    return this.status;
  }

  get Data(): GenericBuilder {
    return this.data;
  }

  get Token(): string {
    return this.token;
  }

  get Message(): string {
    return this.message;
  }
}
