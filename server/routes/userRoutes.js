import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile, getDashboardSummary, getNotifications } from '../controllers/userController.js';

const router = express.Router();

router.use(protect);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/dashboard', getDashboardSummary);
router.get('/notifications', getNotifications);

export default router;
