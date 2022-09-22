import { Router } from 'express';
import LeaderboardController from '../database/controllers/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getAllHome);
router.get('/away', leaderboardController.getAllAway);
router.get('/', leaderboardController.getAll);

export default router;
