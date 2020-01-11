import * as supertest from 'supertest';
import 'jest';
import { app } from '@/index';
import { setupUser, cleanupUser } from '../../helpers';

describe('AuthRoutes', () => {
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

  it('should not log a user in with an incorrect password', (done) => {
    supertest(app)
      .post('/api/auth/login')
      .send({
        username: 'joejoe',
        password: 'wordpass'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('login.failed');
        done();
      });
  });

  it('should not log a user in with an incorrect username', done => {
    supertest(app)
      .post('/api/auth/login')
      .send({
        username: 'howdy',
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('login.failed');
        done();
      });
  });

  it('should return a validation error for missing parameter username', (done) => {
    supertest(app)
      .post('/api/auth/login')
      .send({
        password: 'password'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.status).toBe(400);
        expect(res.body.validation).toBeInstanceOf(Array);
        expect(res.body.validation[0].field).toBe('username');
        expect(res.body.validation[0].message).toBe(
          'username should not be null or undefined'
        );
        expect(res.body.message).toBe('validation.failed');
        done();
      });
  });
  it('should return a validation error for missing parameter password', done => {
    supertest(app)
      .post('/api/auth/login')
      .send({
        username: 'joejoe'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res.status).toBe(400);
        expect(res.body.validation).toBeInstanceOf(Array);
        expect(res.body.validation[0].field).toBe('password');
        expect(res.body.validation[0].message).toBe(
          'password should not be null or undefined'
        );
        expect(res.body.message).toBe('validation.failed');
        done();
      });
  });
});
