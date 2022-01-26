import express from 'express';
import { check } from 'express-validator';
import { getUser, loginUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Express Router
const router = express.Router();

// Checks
const validationChecks = [
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password is required').exists(),
];

router.route('/').get(protect, getUser).post(validationChecks, loginUser);

export default router;
