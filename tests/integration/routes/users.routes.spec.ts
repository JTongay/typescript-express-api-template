import { app, server } from '@/index';
import { User, IUser } from '@/models';
import * as supertest from 'supertest';

describe('Users Routes', () => {

  beforeEach(async () => {
    const testUser: IUser = new User({ username: 'joejoe', password: 'password', admin: true });
    await testUser.save();
  });

  afterEach(async () => {
    await User.findOneAndRemove({ username: 'joejoe' });
  });

  it('should get all of the users', (done) => {
    supertest(app)
      .get('/api/user')
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
