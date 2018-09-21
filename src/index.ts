import * as config from 'config';
import { Server } from './app';

// create http server
export const app = Server.bootstrap().app;
export const server = (process.env.NODE_ENV !== 'test') ? app.listen(config.get('port')) : undefined;
