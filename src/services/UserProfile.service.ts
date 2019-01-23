import { Response, NextFunction } from 'express';
import { IUsersController } from '@/controllers/types';
import { IUserProfileService, IAuthService } from '@/services/types';
import { ValidatedDataRequest } from '@/types';
import { injectable, inject } from 'inversify';
import { TYPES } from '@/inversify.types';
import 'reflect-metadata';
import { IUser } from '@/models';
import { logger } from './logger';

@injectable()
export class UserProfileService implements IUserProfileService {
  private _usersController: IUsersController;

  constructor(
    @inject(TYPES.IUserController) usersController: IUsersController
  ) {
    this._usersController = usersController;
  }

  /**
   * Checks for a User by _id in the query param and attaches the response to the data object in the request if it exists
   * @param req ValidatedDataRequest - The extended request object from express
   * @param res Response
   * @param next NextFunction - continue with the flow
   */
  public checkUser = async (
    req: ValidatedDataRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    let user: IUser;
    const userId: string = req.params.id;
    // Check for the presence of request data object or define it
    req.data = req.data || {};
    try {
      user = await this._usersController.getUserById(userId);
      if (!user) {
        throw new Error(`Couldn't find user: ${userId}`);
      }
      // add the found user to the request data object
      req.data = user;
      next();
    } catch (e) {
      logger.error(`Error GET /users/${userId} with ${e}`);
      next(e);
    }
  }

  public ownUser(
    req: ValidatedDataRequest,
    res: Response,
    next: NextFunction
  ) {}
}
