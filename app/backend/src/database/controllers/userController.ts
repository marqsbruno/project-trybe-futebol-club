import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const checkData = await this.userService.validateUser(email, password);
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!checkData) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = this.userService.createToken(email, password);
    return res.status(200).json({ token });
  };

  public validateToken = async (req:Request, res:Response) => {
    const { authorization } = req.headers;
    const role = await this.userService.validateToken(authorization as string);
    return res.status(200).json({ role });
  };
}
