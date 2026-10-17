import jwt from 'jsonwebtoken';
import { JsonWebToken } from '../../application/ports/JsonWebToken';

export class Jwt implements JsonWebToken {
  private readonly secret = process.env.JWT_SECRET || 'super_secret_key';
  private readonly expired = process.env.JWT_EXPIRES_IN || '1d';

  sign(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: <any>this.expired });
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
