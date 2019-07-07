import * as supertest from 'supertest';
import { app } from '@/index';
import 'jest';

const request = supertest(app);
export function loginUser(auth: any): (done: any) => void {
  return function(done: any) {
    request
    .post('/api/login')
    .send({
      username: 'joejoe',
      password: 'password',
    })
    .expect(200)
    .end((err, res) => {
      console.log(res, 'here');
      auth.token = res.body.token;
      return done();
    });
  };
}
