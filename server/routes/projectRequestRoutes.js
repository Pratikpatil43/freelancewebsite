import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import { createProjectRequest, getProjectRequests, getProjectRequestById, addProjectMessage, submitPayment } from '../controllers/projectRequestController.js';
import { validateRequest } from '../validators/validateRequest.js';
import multer from 'multer';

const router = express.Router();
const paymentUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.use(protect);

router.get('/', getProjectRequests);
router.post(
  '/',
  [
    body('studentName').notEmpty().withMessage('Student name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('projectTitle').notEmpty().withMessage('Project title is required'),
    body('projectDescription').notEmpty().withMessage('Project description is required'),
    body('phone').isLength({ min: 8, max: 15 }).withMessage('Valid phone number is required'),
    body('collegeName').notEmpty().withMessage('College name is required'),
    body('department').notEmpty().withMessage('Department is required'),
    body('semester').notEmpty().withMessage('Semester is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('projectCategory').notEmpty().withMessage('Project category is required'),
    body('package').isIn(['Basic', 'Premium']).withMessage('Choose Basic or Premium package'),
  ],
  validateRequest,
  createProjectRequest
);
router.get('/:id', getProjectRequestById);
router.post('/:id/messages', body('text').trim().isLength({ min: 1, max: 4000 }), validateRequest, addProjectMessage);
router.post('/:id/payment', paymentUpload.single('screenshot'), submitPayment);

export default router;
