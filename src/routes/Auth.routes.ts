import { BaseRoute } from './route';
import { IAuthService } from '@/services/types';
import { Router, Request, Response, NextFunction } from 'express';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { logger } from '@/services';
import { IUsersController } from '@/controllers/types';
import { UserRequest, UserRequestBuilder } from '@/builders/request';
import { IUser } from '@/models';
import { SuccessResponse, SuccessResponseBuilder, ErrorResponse, ErrorResponseBuilder } from '@/builders/response';

interface RequestBody {
  username: string;
  password: string;
}

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
    this.router.post('/login', this.login.bind(this));
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password }: RequestBody = req.body;
    const userRequest: UserRequest = new UserRequestBuilder(username, password).build();
    let user: IUser;
    try {
      // get the user
      user = await this._usersController.getUserByUsername(userRequest.Username);
      // verify password
      const passwordMatch: boolean = this._authService.verifyPassword(userRequest.Password, user.password);
      if (passwordMatch) {
        // generate token
        const token: string = this._authService.generateToken(user._id);
        // send it out
        const successResponse: SuccessResponse = new SuccessResponseBuilder(200).setToken(token).build();
        res.status(200).json(successResponse);
      } else {
        const errorResponse: ErrorResponse = new ErrorResponseBuilder(401).build();
        res.status(401).json(errorResponse);
      }
    } catch (e) {
      logger.error(`Error POST /login with ${e}`);
      next(e);
    }
  }
}
