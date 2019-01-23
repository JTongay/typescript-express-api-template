import { Response, NextFunction } from 'express';
import { IUser, User } from '@/models';
import { ValidatedDataRequest } from '@/types';
import { logger } from '@/services';

/**
 * Checks for a user in the DB and attaches the data to the main Request object if it exists
 * @param req ValidatedDataRequest - extended Request object from express
 * @param res Respone
 * @param next NextFunction - continue with the process
 */
export async function checkUser(req: ValidatedDataRequest, res: Response, next: NextFunction): Promise<void> {
  const userId = req.params.id;
  // Check for the presence of request data object or define it
  req.data = req.data || {};
  try {
    const user: IUser = await User.findById(userId);
    if (!user) {
      throw new Error(`Couldn't find user: ${userId}`);
    }
    // add the found user to the request data object
    req.data = user;
    next();
  } catch (e) {
    logger.error(`Error GET /users${userId} with ${e}`);
    next(e);
  }
}
