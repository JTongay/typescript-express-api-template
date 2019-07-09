import { app } from '@/index';
import { User, IUser } from '@/models';
import * as supertest from 'supertest';
import { setupUser, loginUser, cleanupUser } from '../../helpers';

interface Auth {
  token?: string;
}

describe('Users Routes', () => {
  const auth: Auth = {};
  beforeAll(async (done) => {
    await setupUser();
    return loginUser(auth)(done);
  });

  afterAll(async (done) => {
    await cleanupUser();
    return done();
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
          expect(res.body.data).toHaveLength(1);
          done();
        }
      });
  });
});
