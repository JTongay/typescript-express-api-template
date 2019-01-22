import { IUsersController } from '@/controllers/types';
import { container } from '@/inversify.config';
import { TYPES } from '@/inversify.types';
import { IUser } from '@/models/User.model';
import { BaseRoute } from '@/routes/route';
import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';
import { UserRequest, UserRequestBuilder } from '@/builders/request';
import { SuccessResponse, SuccessResponseBuilder } from '@/builders/response';

interface RequestBody {
  username: string;
  password: string;
}

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
    this.getUser = this.getUser.bind(this);
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
    this.router.get('/:id', this.getUser);
    this.router.post('/', this.createUser);
  }

  private async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    let users: IUser[];
    console.log(req.headers);
    try {
      users = await this._usersController.getUsers();
      const successResponse: SuccessResponse = new SuccessResponseBuilder(200)
        .setData(users)
        .build();
      res.status(200).json(successResponse);
    } catch (e) {
      logger.error(`Error GET /users with ${e}`);
      next(e);
    }
  }

  private async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let user: IUser;
    const userId: string = req.params.id;
    try {
      user = await this._usersController.getUserById(userId);
      res.status(200).json(user);
    } catch (e) {
      logger.error(`Error GET /users${userId} with ${e}`);
      next(e);
    }
  }

  private async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    let userRequest: UserRequest;
    const { username, password }: RequestBody = req.body;
    try {
      console.log(req.body, 'username in route');
      userRequest = new UserRequestBuilder(username, password).build();
      await this._usersController.addUser(userRequest);
      res.status(200).json({'status': 'success'});
    } catch (e) {
      logger.error(`Error POST /user with ${e}`);
      next(e);
    }
  }
}
