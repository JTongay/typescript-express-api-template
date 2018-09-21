import { UsersController } from '@/controllers';
import { IUsersController } from '@/controllers/types';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';

const container: Container = new Container();
container.bind<IUsersController>(TYPES.IUserController).to(UsersController);

export { container };
