import express from 'express';
const router = express.Router();
import { testController } from '../controllers/postController.js';

router.get('/', testController);

export default router;
