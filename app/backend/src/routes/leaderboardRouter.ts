import { Router } from 'express';
import LeaderboardController from '../database/controllers/matchController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getAll);

export default router;
