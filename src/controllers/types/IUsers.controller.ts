import { IUser } from '@/models/User.model';
import { UserRequest } from '@/builders/request';

export interface IUsersController {
  getUsers(): Promise<IUser[]>;
  addUser(userRequest: UserRequest): Promise<void>;
  getUserByUsername(username: string): Promise<IUser>;
  getUserById(id: string): Promise<IUser>;
}
