import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as path from 'path';
require('dotenv').config();

import { Connection } from '@/db';
import { ApiRoutes } from './routes';
import { logger } from './services';
import { baseErrorHandler, jwtErrorHandler, jwtValidator } from './middleware';

/**
 * The server.
 *
 * @class Server
 */
export class Server {
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  public static bootstrap (): Server {
    return new Server();
  }

  public app: express.Application;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor () {
    // create expressjs application
    this.app = express();
    // configure application
    this.config();

    // connect to db
    this.connectToDb();

    // add routes
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config () {
    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));

    // mount logger
    this.app.use(morgan('tiny', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    } as morgan.Options));

    // auth middleware
    this.app.use(jwtValidator(process.env.JWT_SECRET));
    this.app.use(jwtErrorHandler);

    // mount json form parser
    this.app.use(bodyParser.json({ limit: '50mb' }));

    // mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    // mount override?
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(methodOverride());
    this.app.use(expressStatusMonitor());

    // dev env error handling
    if (process.env.NODE_ENV === 'development') {
      this.app.use(errorHandler());
    }

    // main error handling
    this.app.use(baseErrorHandler);
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes () {
    // use router middleware
    this.app.use(ApiRoutes.path, ApiRoutes.router);
  }

  private connectToDb(): Connection {
    return new Connection();
  }
}
