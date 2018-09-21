import { IUsersController } from '@/controllers/types/IUsers.controller';
import { IUser, User } from '@/models/User.model';
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

  public async addUser(): Promise<void> {
    let user: IUser;
    try {
      user = new User({username: 'booyah', password: 'password'});
      await user.save();
    } catch (e) {
      throw new Error(e);
    }
  }

}
