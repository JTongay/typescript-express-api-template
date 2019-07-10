import * as supertest from 'supertest';
import 'jest';
import { IUser, User } from '@/models';
import { app } from '@/index';
import { AuthService } from '@/services';
import { setupUser, cleanupUser } from '../../helpers';

describe('AuthRoutes', () => {
  const authService = new AuthService(); // When inserting a test user, you must hash the password first for password comparison when logging in!
  beforeEach(async done => {
    await setupUser();
    done();
  });
  afterEach(async done => {
    await cleanupUser();
    done();
  });

  it('should login a user', (done) => {
    supertest(app)
      .post('/api/auth/login')
      .send({
        username: 'joejoe',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        done();
      });
  });
});
