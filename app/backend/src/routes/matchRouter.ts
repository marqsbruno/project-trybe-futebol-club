import { Router } from 'express';
import MatchController from '../database/controllers/matchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);
router.post('/', matchController.createMatch);
router.patch('/:id/finish', matchController.updateMatch);

export default router;
