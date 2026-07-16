import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';
import { getAdminDashboard, getAdminProjectRequests, getAdminAnalytics, getAdminClients, updateProjectRequest, addAdminMessage, releaseProject, getPaymentScreenshot } from '../controllers/adminController.js';
import { body } from 'express-validator';
import { validateRequest } from '../validators/validateRequest.js';

const router = express.Router();
router.use(protect, adminOnly);

router.get('/dashboard', getAdminDashboard);
router.get('/analytics', getAdminAnalytics);
router.get('/requests', getAdminProjectRequests);
router.get('/clients', getAdminClients);
router.patch('/requests/:id', updateProjectRequest);
router.post('/requests/:id/messages', body('text').trim().isLength({ min: 1, max: 4000 }), validateRequest, addAdminMessage);
router.post('/requests/:id/release', releaseProject);
router.get('/requests/:id/payment-screenshot', getPaymentScreenshot);

export default router;
