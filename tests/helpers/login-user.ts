import * as supertest from 'supertest';
import { app } from '@/index';
import 'jest';

export function loginUser(auth: any): (done: any) => void {
  return function(done: any) {
    supertest(app)
      .post('/api/auth/login')
      .send({
        username: 'joejoe',
        password: 'password',
      })
      .expect(200)
      .end((err, res) => {
        auth.token = res.body.token;
        return done();
      });
  };
}
