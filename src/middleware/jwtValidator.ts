import * as jwt from 'express-jwt';

export function jwtValidator(JWT_SECRET: string) {
  return jwt({
    secret: JWT_SECRET
  }).unless({ path: ['/api/auth/login'] });
}
