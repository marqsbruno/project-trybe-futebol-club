import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!this.userService.validateUser(email, password)) {
      return res.status(401).json('deu ruim');
    }
    const token = this.userService.createToken(email, password);
    return res.status(200).json({ token });
  };
}
