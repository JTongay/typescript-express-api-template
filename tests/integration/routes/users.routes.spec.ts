import { app } from '@/index';
import * as supertest from 'supertest';
import { setupUser, loginUser, cleanupUser } from '../../helpers';

interface Auth {
  token?: string;
}

describe('Users Routes', () => {
  const auth: Auth = {};
  beforeEach(async (done) => {
    await setupUser();
    return loginUser(auth)(done);
  });

  afterEach(async (done) => {
    await cleanupUser();
    done();
  });

  it('should get all of the users', (done) => {
    supertest(app)
      .get('/api/user')
      .set('Authorization', `bearer ${auth.token}`)
      .end((err: any, res: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body.data).toBeInstanceOf(Array);
          done();
        }
      });
  });
});
