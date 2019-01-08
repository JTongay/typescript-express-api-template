import { GenericBuilder } from '@/builders';

/**
 * UserRequestBuilder
 * Takes in the input from the request and builds an object that will play nice with the DB
 */
export class UserRequestBuilder extends GenericBuilder {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    super();
    this._username = username;
    this._password = password;
  }

  get Username(): string {
    return this._username;
  }

  public setUsername(val: string): UserRequestBuilder {
    this._username = val;
    return this;
  }

  get Password(): string {
    return this._password;
  }

  public setPassword(val: string): UserRequestBuilder {
    this._password = val;
    return this;
  }

  public build(): UserRequest {
    return new UserRequest(this);
  }
}

export class UserRequest {
  private _username: string;
  private _password: string;

  constructor(builder: UserRequestBuilder) {
    this._username = builder.Username;
    this._password = builder.Password;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }
}
