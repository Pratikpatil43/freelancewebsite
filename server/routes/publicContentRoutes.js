import express from 'express';
import { getLandingContent, getServices, getPortfolio, getPricingPackages, getContactEnquiries } from '../controllers/publicContentController.js';

const router = express.Router();

router.get('/landing', getLandingContent);
router.get('/services', getServices);
router.get('/portfolio', getPortfolio);
router.get('/pricing', getPricingPackages);
router.post('/enquiries', getContactEnquiries);

export default router;
