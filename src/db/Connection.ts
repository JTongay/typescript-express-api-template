import * as mongoose from 'mongoose';
import { logger } from 'services';

export class Connection {

  private mongoUri: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}/${process.env.DB_NAME}`;

  constructor() {
    mongoose.connect(this.mongoUri, { useNewUrlParser: true }, (err: mongoose.Error) => {
      if (err) {
        logger.error(err.message);
      } else {
        logger.info('Successfully Connected');
      }
    });
  }
}
