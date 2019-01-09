import { IAuthService } from '@/services/types';
import { injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'reflect-metadata';

@injectable()
export class AuthService implements IAuthService {
  constructor () {}
  /**
   *
   * @param {string} userId
   * @returns {string}
   */
  public generateToken (userId: string): string {
    return jwt.sign({id: userId}, process.env.JWT_SECRET);
  }

  /**
   *
   * @param {string} token
   * @returns {string | object}
   */
  public verifyToken (token: string): void {
    return jwt.verify(token, process.env.JWT_SECRET, (err: jwt.JsonWebTokenError, data: string | object) => {
      if (err) {
        throw Error(`${err}`);
      }
      return data;
    });
  }

  /**
   *
   * @param {string} password - The password to hash
   * @returns {Promise<string>} - The hashed password
   */
  public async hashPassword (password: string): Promise<string> {
    const salt: string = await this.generateSalt(12);
    return await bcrypt.hash(password, salt);
  }

  /**
   *
   * @param {string} passwordRequest
   * @param {string} passwordResponse
   * @returns {Promise<boolean>}
   */
  public verifyPassword (passwordRequest: string, passwordResponse: string): boolean {
    return bcrypt.compareSync(passwordRequest, passwordResponse);
  }

  private async generateSalt(rounds: number): Promise<string> {
    return await bcrypt.genSalt(rounds);
  }
}
