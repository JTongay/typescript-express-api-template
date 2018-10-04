import { Connection } from '@/db';
import DB_CONFIG from '@/db/config';
import * as dotenv from 'dotenv';
import 'jest';
dotenv.config();

describe('Connection DB', () => {
  const req = {};
  const cb = jest.fn();
  xit('should give the test mongo URI in test env', () => {
    process.env.NODE_ENV = 'test';
    const connection: Connection = new Connection();

    console.log(connection.mongoUri);
    expect(connection.mongoUri).toBe(DB_CONFIG.test.uri);
  });
});
