import express from 'express';
import { auth } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', protect, auth);

export default router;
