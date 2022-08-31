import { Router } from 'express';
import MatchController from '../database/controllers/matchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);
router.post('/', matchController.createMatch); // JWT
router.patch('/:id/finish', matchController.updateMatch);
router.patch('/:id', matchController.updateScore);

export default router;
