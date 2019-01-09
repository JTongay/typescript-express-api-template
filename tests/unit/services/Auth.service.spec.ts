import { AuthService } from '@/services';
import { IAuthService } from '@/services/types';
import 'jest';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Auth Service', () => {
  let authService: IAuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should be defined', () => {
    // Add your unit tests
    expect(authService).toBeDefined();
  });

  it('should generate a token', () => {
    const token: string = authService.generateToken('1234');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should verify a valid token', () => {
    const token: string = authService.generateToken('1234');
    const isValid: any = authService.verifyToken(token);
    expect(isValid).toBeDefined();
  });

  it('should not verify an invalid token', () => {
    // wrap your errors in an anonymous function when you call them. see https://github.com/facebook/jest/issues/781
    expect(() => { authService.verifyToken('booyfdasgdasdg2312ah'); }).toThrow('JsonWebTokenError: jwt malformed');
  });

  it('should hash a given password', async () => {
    const hashedPassword: string = await authService.hashPassword('booyah');
    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword).not.toBe('booyah');
  });

  it('should decrypt a hashed password and return true with successful password match', async () => {
    const hashedPassword: string = await authService.hashPassword('booyah');
    const verifyPassword: boolean = authService.verifyPassword('booyah', hashedPassword);
    expect(verifyPassword).toBe(true);
  });

  it('should decrypt a hashed password and return false with an unsuccessful password match', () => {
    const verifyPassword: boolean = authService.verifyPassword('booyah', 'asdgasgwerwerasdf');
    expect(verifyPassword).toBe(false);
  });
});
