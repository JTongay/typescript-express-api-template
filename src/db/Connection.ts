import * as mongoose from 'mongoose';
import { logger } from '@/services';
import DB_CONFIG from './config';

export class Connection {

  private mongoUri: string;

  constructor() {
    this.setEnvUri();
    console.log(process.env);
    mongoose.connect(this.mongoUri, { useNewUrlParser: true }, (err: mongoose.Error) => {
      if (err) {
        logger.error(err.message);
      } else {
        logger.info('Successfully Connected');
      }
    });
  }

  private setEnvUri(): void {
    switch (process.env.NODE_ENV) {
      case 'test':
        this.mongoUri = DB_CONFIG.test.uri;
        break;
      case 'development':
        this.mongoUri = DB_CONFIG.development.uri;
        break;
      case 'production':
        this.mongoUri = process.env.DATABASE_URL;
        break;
      case 'ci':
        this.mongoUri = DB_CONFIG.ci.uri;
        break;
      default:
        throw new Error('NODE_ENV not set!');
    }
  }
}
