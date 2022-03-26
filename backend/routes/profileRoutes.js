import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getCurrProfile } from '../controllers/profileController.js';

router.route('/me').get(protect, getCurrProfile);

export default router;
