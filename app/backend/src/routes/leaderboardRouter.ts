import { Router } from 'express';
import LeaderboardController from '../database/controllers/leaderboardController'; // arrumar rota

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getAllHome);
router.get('/away', leaderboardController.getAllAway);

export default router;
