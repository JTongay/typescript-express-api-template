import { GenericBuilder } from '..';
import { IUser } from '@/models';

export class UserResponseBuilder extends GenericBuilder {
  constructor(res: IUser) {
    super();
  }
}
