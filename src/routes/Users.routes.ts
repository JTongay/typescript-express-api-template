import { IUsersController } from '@/controllers/types';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IUser } from '@/models/User.model';
import { BaseRoute } from '@/routes/route';
import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';


export class UsersRoutes extends BaseRoute {
  private static instance: UsersRoutes;
  private _usersController: IUsersController;

  constructor(
    private UsersController: IUsersController,
  ) {
    super();
    this._usersController = UsersController;

    this.getUsers = this.getUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.init();
  }

  public static get router(): Router {
    if (!UsersRoutes.instance) {
      UsersRoutes.instance = new UsersRoutes(
        container.get<IUsersController>(TYPES.IUserController),
      );
    }
    return UsersRoutes.instance.router;
  }

  private init(): void {
    logger.info('Creating UsersRoutes');

    this.router.get('/', this.getUsers);
    this.router.get('/user', this.createUser);
  }

  private async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    let users: IUser[];
    try {
      users = await this._usersController.getUsers();
      res.status(200).json(users);
    } catch (e) {
      logger.error(`Error GET /users with ${e}`);
      next(e);
    }
  }

  private async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this._usersController.addUser();
      res.status(200).json({'status': 'success'});
    } catch (e) {
      next(e);
    }
  }
}
