import * as supertest from 'supertest';
import 'jest';
import { IUser, User } from '@/models';
import { app } from '@/index';
import { AuthService } from '@/services';

describe('AuthRoutes', () => {
  const authService = new AuthService(); // When inserting a test user, you must hash the password first for password comparison when logging in!
  beforeAll(async done => {
    const testUser: IUser = new User({
      username: 'joejoe',
      password: await authService.hashPassword('password'),
      admin: true
    });
    await testUser.save();
    return done();
  });
  afterEach(async done => {
    await User.findOneAndRemove({ username: 'joejoe' });
    return done();
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
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        return done();
      });
  });
});
