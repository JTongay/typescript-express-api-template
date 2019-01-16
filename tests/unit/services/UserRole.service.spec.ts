import { UserRoleService } from '@/services';
import { mock, when } from 'ts-mockito';
import { IUser, User } from '@/models';
// import { NextFunction } from 'express';
import * as express from 'express';
import 'jest';

describe('UserRole Service', () => {
  let userRoleService: UserRoleService;
  let mockUser: IUser;

  beforeEach(() => {
    userRoleService = new UserRoleService();
  });

  afterEach(() => {
    mockUser = undefined;
  });

  it('should exist', () => {
    // Add your unit tests
    expect(userRoleService).toBeDefined();
  });

  it('should give users read access for users', () => {
    mockUser = new User({username: 'test', password: 'booyah'});
    const result: boolean = userRoleService.userHasPermission(mockUser, 'read', 'users');
    expect(result).toEqual(true);
  });

  it('should not give users delete, create, or update access for users', () => {
    mockUser = new User({ username: 'test', password: 'booyah' });
    const deleteResult: boolean = userRoleService.userHasPermission(mockUser, 'delete', 'users');
    const createResult: boolean = userRoleService.userHasPermission(mockUser, 'create', 'users');
    const updateResult: boolean = userRoleService.userHasPermission(mockUser, 'update', 'users');
    expect(deleteResult).toEqual(false);
    expect(createResult).toEqual(false);
    expect(updateResult).toEqual(false);
  });

  it('should give admins access to everything', () => {
    mockUser = new User({ username: 'test', password: 'booyah', role: 'admin' });
    const readResult: boolean = userRoleService.userHasPermission(mockUser, 'read', 'users');
    const deleteResult: boolean = userRoleService.userHasPermission(mockUser, 'delete', 'users');
    const createResult: boolean = userRoleService.userHasPermission(mockUser, 'create', 'users');
    const updateResult: boolean = userRoleService.userHasPermission(mockUser, 'update', 'users');
    expect(readResult).toEqual(true);
    expect(deleteResult).toEqual(true);
    expect(createResult).toEqual(true);
    expect(updateResult).toEqual(true);
  });

  // it('should continue through the route successfully with a user with the correct permission', () => {
  //   jest.mock('@/services');
  //   mockUser = new User({ username: 'test', password: 'booyah', role: 'admin' });
  //   UserRoleService.prototype.userHasPermission = jest.fn().mockImplementationOnce((user, permission, resource) => {
  //     return true;
  //   });
  //   const result: any = userRoleService.requireRolePermission('users', 'read');
  //   expect(result()).toHaveBeenCalled();
  // });
});

