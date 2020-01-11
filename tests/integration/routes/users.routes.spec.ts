import { app } from '@/index';
import * as supertest from 'supertest';
import { setupUser, loginUser, cleanupUser } from '../../helpers';
import { IUser, User } from '@/models';
import { getUser } from '../../helpers/get-user-info';

interface Auth {
  token?: string;
}

describe('Users Routes', () => {
  const auth: Auth = {};
  let user: IUser;
  beforeAll(async (done) => {
    await setupUser();
    user = await getUser();
    return loginUser(auth)(done);
  });

  afterAll(async (done) => {
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

  it('should get a single user', (done) => {
    console.log(user);
    console.log(auth);
    supertest(app)
      .get(`/api/user/${user._id}`)
      .set('Authorization', `bearer ${auth.token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body.data).toBeInstanceOf(Object);
          expect(res.body.data.username).toBe('joejoe');
          done();
        }
      })
  })
});
