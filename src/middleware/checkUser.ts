import { Response, NextFunction } from 'express';
import { IUser, User } from '@/models';
import { ValidatedDataRequest } from '@/types';

export async function checkUser(req: ValidatedDataRequest, res: Response, next: NextFunction): Promise<void> {
  const userId = req.params.id;
  try {
    const user: IUser = await User.findById(userId);
    if (!user) {
      throw new Error(`Couldn't find user: ${userId}`);
    }
    req.data = {};
    next();
  } catch (e) {
    next(e);
  }
}
