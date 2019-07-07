import { app } from '@/index';
import * as supertest from 'supertest';
import { loginUser } from '../login-user';
import { IUser, User } from '@/models';

interface Auth {
  token?: string;
}

describe('ping route', () => {
  const auth: Auth = {};
  beforeEach(async (done) => {
    const testUser: IUser = new User({
      username: 'joejoe',
      password: 'password',
      admin: true
    });
    await testUser.save();
    loginUser(auth);
    console.log(auth);
    return done();
  });
  afterEach(async (done) => {
    await User.findOneAndRemove({ username: 'joejoe' });
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
          console.log(auth)
          expect(res.status).toBe(200);
          expect(res.body).toBe('pong');
          done();
        }
      });
  });
});
