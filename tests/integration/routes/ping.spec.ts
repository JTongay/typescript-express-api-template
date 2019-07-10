import { app } from '@/index';
import * as supertest from 'supertest';
import { loginUser, setupUser, cleanupUser, DbManager } from '../../helpers';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

interface Auth {
  token?: string;
}

fdescribe('ping route', () => {
  const auth: Auth = {};
  // const dbManager: DbManager = new DbManager();
  beforeEach(async (done) => {
    // await dbManager.start();
    await setupUser();
    return loginUser(auth)(done);
  });
  afterEach(async (done) => {
    // dbManager.stop();
    await cleanupUser();
    done();
  });
  it('should return pong', (done) => {
    supertest(app)
      .get('/api/ping')
      .set('Authorization', `bearer ${auth.token}`)
      .end((err: any, res: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body).toBe('pong');
          done();
        }
      });
  });
});
