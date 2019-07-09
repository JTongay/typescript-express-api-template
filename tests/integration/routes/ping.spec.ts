import { app } from '@/index';
import * as supertest from 'supertest';
import { loginUser, setupUser, cleanupUser } from '../../helpers';

interface Auth {
  token?: string;
}

describe('ping route', () => {
  const auth: Auth = {};
  beforeEach(async (done) => {
    await setupUser();
    return loginUser(auth)(done);
  });
  afterEach(async (done) => {
    await cleanupUser();
    return done();
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
