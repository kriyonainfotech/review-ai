const express = require('express');
const { generateAIReview, getReviews, addReview } = require('../controllers/reviewController');

const router = express.Router();

// AI Generation
router.post('/generate/:slug', generateAIReview);

// Review management
router.get('/:slug', getReviews);
router.post('/:slug', addReview);

module.exports = router;

