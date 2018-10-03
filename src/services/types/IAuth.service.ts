export interface IAuthService {
  generateToken (userId: string): string;
  verifyToken (token: string): void;
  hashPassword (password: string): string;
  verifyPassword (passwordRequest: string, passwordResponse: string): boolean;
}
