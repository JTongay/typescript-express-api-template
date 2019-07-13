const { MongoClient } = require('mongodb');
import { MongoMemoryServer } from 'mongodb-memory-server';

// Extend the default timeout so MongoDB binaries can download
jest.setTimeout(60000);

// List your collection names here
const COLLECTIONS = ['users'];

export class DbManager {
  db;
  server: MongoMemoryServer;
  connection;
  constructor() {
    this.db = null;
    this.server = new MongoMemoryServer();
    this.connection = null;
  }

  async start() {
    const url = await this.server.getConnectionString();
    this.connection = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log(this.connection);
    this.db = this.connection.db(await this.server.getDbName());
  }

  stop() {
    this.connection.close();
    return this.server.stop();
  }

  cleanup() {
    return Promise.all(COLLECTIONS.map(c => this.db.collection(c).remove({})));
  }
}
