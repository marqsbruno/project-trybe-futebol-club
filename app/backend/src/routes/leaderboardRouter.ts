import { Router } from 'express';
import LeaderboardController from '../database/controllers/matchController'; // arrumar rota

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/leaderboard/home', leaderboardController.getAll);

export default router;
