import { UserRequest } from '@/builders/request';
import { IUsersController } from '@/controllers/types';
import { IUser, User } from '@/models';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UsersController implements IUsersController {

  public async getUsers(): Promise<IUser[]> {
    let response: IUser[];
    try {
      response = await User.find();
      return response;
    } catch (e) {
      throw new Error(e);
    }
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
    let response: IUser;
    try {
      response = await User.findOne({_id: id});
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async addUser(userRequest: UserRequest): Promise<void> {
    let user: IUser;
    try {
      user = new User(userRequest);
      await user.save();
    } catch (e) {
      throw new Error(e);
    }
  }

}
