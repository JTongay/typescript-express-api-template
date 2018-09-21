import * as mongoose from 'mongoose';

export class Connection {

  private mongoUri: string = 'mongodb://127.0.0.1:27017/booyah';

  constructor() {
    mongoose.connect(this.mongoUri, { useNewUrlParser: true }, (err: any) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Successfully Connected');
      }
    });
  }
}
