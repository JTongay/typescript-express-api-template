import { IUser } from '@/models';

export interface IUserRoleService {
  userHasPermission(user: IUser, permission: string, method: string): boolean;
  requireRolePermission(resource: string, permission: string): any;
}
