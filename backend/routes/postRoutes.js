import express from 'express';
const router = express.Router();
import { check } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import {
    createPost,
    deletePostById,
    getAllPosts,
    getPostById,
} from '../controllers/postController.js';

// Post Checks
const postChecks = [check('text', 'Text is required').notEmpty()];

router.route('/').post(protect, postChecks, createPost).get(protect, getAllPosts);
router.route('/:id').get(protect, getPostById).delete(protect, deletePostById);

export default router;
