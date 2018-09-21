import { app, server } from '@/index';
import * as supertest from 'supertest';

describe('Users Routes', () => {
  // afterEach(async () => {
  //   await server.close();
  // });
  it('should get all of the users', (done) => {
    supertest(app)
      .get('/api/user')
      .end((err: any, res: supertest.Response) => {
        if (err) {
          console.log(err);
          done(err);
        } else {
          console.log(res);
          expect(res.status).toBe(200);
          expect(res.body).toHaveLength(1);
          done();
        }
      });
  });
});
