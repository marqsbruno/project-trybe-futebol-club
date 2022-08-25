import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../models/users';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  public validateUser = async (email: string, password:string) => {
    const verifyUser = await User.findOne({ where: { email } });
    if (!verifyUser) {
      return null;
    }
    // https://www.npmjs.com/package/bcryptjs
    const verifyPassword = await bcrypt.compare(password, verifyUser.password);
    if (!verifyPassword) {
      return null;
    }
    return verifyUser;
  };

  public createToken = (email: string, password:string) => {
    const token = jwt.sign({ email, password }, secret);
    return token;
  };

  public validateToken = async (token: string) => {
    const verifyToken = jwt.verify(token, secret);
    const { email } = verifyToken as jwt.JwtPayload;
    const user = await User.findOne({ where: { email } });
    // if para a possibilidade de ser nulo;
    if (user) return user.role;
  };
}
