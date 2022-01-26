import express from 'express';
import { check } from 'express-validator';
import { registerUser } from '../controllers/userController.js';

// User Express Router
const router = express.Router();

// Checks
const validationChecks = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

router.route('/').post(validationChecks, registerUser);

export default router;
