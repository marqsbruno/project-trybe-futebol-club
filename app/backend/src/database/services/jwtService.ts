import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class JwtService {
  public verifyToken = (token: string) => {
    try {
      const data = jwt.verify(token, secret);
      return data;
    } catch (e) {
      return null;
    }
  };
}
