import { BaseRoute } from './route';
import { IAuthService } from '@/services/types';
import { Router, Request, Response, NextFunction } from 'express';
import { UsersRoutes } from './Users.routes';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { logger } from '@/services';
import { IUsersController } from '@/controllers/types';
import { UserRequest } from '@/builders/request';

export class AuthRoutes extends BaseRoute {
  private static instance: AuthRoutes;
  private _authService: IAuthService;
  private _usersController: IUsersController;

  constructor(
    private authService: IAuthService,
    private usersController: IUsersController
  ) {
    super();
    this._authService = authService;
    this._usersController = usersController;
    this.init();
  }

  public static get router(): Router {
    if (!AuthRoutes.instance) {
      AuthRoutes.instance = new AuthRoutes(
        container.get<IAuthService>(TYPES.IAuthService),
        container.get<IUsersController>(TYPES.IUserController)
      );
    }
    return AuthRoutes.instance.router;
  }

  /**
   * initialize the routes
   */
  private init(): void {
    logger.info('Creating AuthRoutes');
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userRequest: UserRequest;
  }
}
