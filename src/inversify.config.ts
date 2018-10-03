import { UsersController } from '@/controllers';
import { IUsersController } from '@/controllers/types';

import { AuthService } from '@/services';
import { IAuthService } from '@/services/types';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';

const container: Container = new Container();
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IUsersController>(TYPES.IUserController).to(UsersController);

export { container };
