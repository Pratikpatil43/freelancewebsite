import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import projectRequestRoutes from './projectRequestRoutes.js';
import adminRoutes from './adminRoutes.js';
import publicContentRoutes from './publicContentRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/project-requests', projectRequestRoutes);
router.use('/admin', adminRoutes);
router.use('/public', publicContentRoutes);

router.get('/pricing', async (req, res) => {
  res.json({ success: true, message: 'Pricing endpoint ready', data: [] });
});

export default router;
