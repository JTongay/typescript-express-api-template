import { ValidatedDataRequest } from '@/types';
import { Response, NextFunction } from 'express';

export interface IUserProfileService {
  checkUser(req: ValidatedDataRequest, res: Response, next: NextFunction): Promise<void>;
  ownUser(req: ValidatedDataRequest, res: Response, next: NextFunction): void;
}
