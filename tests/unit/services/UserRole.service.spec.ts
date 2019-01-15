import { UserRoleService } from '@/services';
import 'jest';

describe('UserRole Service', () => {
  let userRoleService: UserRoleService;

  beforeEach(() => {
    userRoleService = new UserRoleService();
  });

  it('should exist', () => {
    // Add your unit tests
    expect(true).toBe(true);
  });
});
