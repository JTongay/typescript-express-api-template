import { UsersController } from '@/controllers';
import { IUsersController } from '@/controllers/types';
import { IUser, User } from '@/models';
import { IAuthService } from '@/services/types';
import { mock } from 'ts-mockito';
import { AuthService } from '@/services';
import 'jest';

describe('Users Controller', () => {
  let usersController: IUsersController;
  let authService: IAuthService;

  beforeEach(() => {
    authService = mock(AuthService);
    usersController = new UsersController(authService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  xit('should getUsers successfully', async () => {
    expect.assertions(1);
    await expect(usersController.getUsers()).resolves.toBeDefined();
  });
});
