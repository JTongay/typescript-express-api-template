import * as supertest from 'supertest';
import 'jest';
import { IUser, User } from '@/models';
import { app } from '@/index';

const request = supertest(app);

describe('AuthRoutes', () => {
  beforeAll(async done => {
    const testUser: IUser = new User({
      username: 'joejoe',
      password: 'password',
      admin: true
    });
    await testUser.save();
    return done();
  });
  afterAll(async done => {
    await User.findOneAndRemove({ username: 'joejoe' });
    return done();
  });

  it('should fucking login', (done) => {
    request
      .post('/api/auth/login')
      .send({
        username: 'joejoe',
        password: 'password'
      })
      .end((err, res) => {
        console.log(res, 'res');
        expect(res.status).toBe(200);
        return done();
      });
  });
});
