import { IUser, User } from '@/models';
import { IAuthService } from '@/services/types';
import { AuthService } from '@/services';

export async function setupUser(): Promise<void> {
  const authService: IAuthService = new AuthService();
  const testUser: IUser = new User({
    username: 'joejoe',
    password: await authService.hashPassword('password'),
    admin: false
  });
  await testUser.save();
}
