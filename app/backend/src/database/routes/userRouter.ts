import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

const userController = new UserController();

router.post('/', userController.login);
router.get('/validate', userController.validateToken);

export default Router;
