import { IUser, User } from '@/models';

export async function getUser(): Promise<IUser> {
  return await User.findOne({ 'username': 'joejoe' });
}
