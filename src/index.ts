import * as config from 'config';
import { Server } from './app';
import { Application } from 'express';

// create http server
export const app: Application = Server.bootstrap().app;
export const server = (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'ci') ? app.listen(config.get('port')) : undefined;
