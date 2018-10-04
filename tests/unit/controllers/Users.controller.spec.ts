import { UsersController } from '@/controllers';
import { IUsersController } from '@/controllers/types';
import { IUser, User } from '@/models';
import 'jest';

describe('Users Controller', () => {
  let usersController: IUsersController;

  beforeEach(() => {
    usersController = new UsersController();

  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  xit('should getUsers successfully', async () => {
    expect.assertions(1);
    await expect(usersController.getUsers()).resolves.toBeDefined();
  });
});
