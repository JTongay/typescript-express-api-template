import { IUser } from '@/models/User.model';

export interface IUsersController {
  getUsers(): Promise<IUser[]>;
  addUser(): Promise<void>;
}
