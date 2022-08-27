import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class JwtService {
  public verifyToken = (token: string) => {
    const verify = jwt.verify(token, secret);
    if (!verify) return null;
  };
}
