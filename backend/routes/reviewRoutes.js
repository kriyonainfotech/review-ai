import express from 'express';
import { generateAIReview, getReviews, addReview } from '../controllers/reviewController.js';

const router = express.Router();

// AI Generation
router.post('/generate/:slug', generateAIReview);

// Review management
router.get('/:slug', getReviews);
router.post('/:slug', addReview);

export default router;
