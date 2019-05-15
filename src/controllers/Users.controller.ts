import { UserRequest } from '@/builders/request';
import { IUsersController } from '@/controllers/types';
import { IUser, User } from '@/models';
import { IAuthService } from '@/services/types';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/inversify.types';
import 'reflect-metadata';
import { BaseError } from '@/errors';

@injectable()
export class UsersController implements IUsersController {
  private _authService: IAuthService;

  constructor(@inject(TYPES.IAuthService) authService: IAuthService) {
    this._authService = authService;
  }

  public async getUsers(): Promise<IUser[]> {
    return await User.find();
  }

  public async getUserByUsername(username: string): Promise<IUser> {
    let response: IUser;
    try {
      response = await User.findOne({ username });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getUserById(id: string): Promise<IUser> {
    return await User.findById(id, { password: 0, __v: 0 });
  }

  public async addUser(userRequest: UserRequest): Promise<void> {
    let user: IUser;
    try {
      user = new User(userRequest);
      user.password = await this._authService.hashPassword(user.password);
      await user.save();
    } catch (e) {
      throw new Error(e);
    }
  }

}
