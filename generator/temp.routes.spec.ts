import { app } from '@/index';
import * as supertest from 'supertest';

describe('<%= name %> Routes', () => {
  // Add your description and route
  it('', (done) => {
    supertest(app)
      .get('')
      .end((err: any, res: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          // Add your assertions
          expect(res.status).toBe(200);
          done();
        }
      });
  });
});
