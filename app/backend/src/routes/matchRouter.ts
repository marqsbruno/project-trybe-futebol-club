import { Router } from 'express';
import MatchController from '../database/controllers/matchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);

export default router;
