import { IUser, User } from '@/models';
import 'jest';

describe('UserModel', () => {
  const req = {};
  const cb = jest.fn();
  it('should throw an error when a username and password are not provided', (done) => {
    const user: IUser = new User();

    user.validate((err) => {
      expect(err.errors).toBeDefined();
      done();
    });
  });
});
