import { IUserRoleService } from '@/services/types';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IUser } from '@/models';
import { PermissionsMap } from '@/util/permissionsMap';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@/errors';

@injectable()
export class UserRoleService implements IUserRoleService {
  constructor() {}

  /**
   *
   * @param user - The requested User
   * @param permission - The permission requested
   * @param resource - The method (create, read, update, delete)
   */
  public userHasPermission(
    user: IUser,
    permission: string,
    resource: string
  ): boolean {
    return PermissionsMap[user.role][resource].indexOf(permission) !== -1;
  }

  public requireRolePermission(
    resource: string,
    permission: string
  ): any {
    function checkPermissions(req: Request, res: Response, next: NextFunction) {
      const { user }: any = req;
      if (user && this.userHasPermission(user, permission, resource)) {
        return next();
      } else {
        const e: UnauthorizedError = new UnauthorizedError();
        e.status = 401;
        return next(e);
      }
    }
    return checkPermissions;
  }
}
