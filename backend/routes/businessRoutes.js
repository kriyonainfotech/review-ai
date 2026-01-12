const express = require('express');
const { createBusiness, getBusinessByIdentifier, getBusinessByUser, updateBusiness, checkSlugAvailability } = require('../controllers/businessController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/cloudinary');

const router = express.Router();

// Public Routes (Check availability) - MOVE TO TOP
router.get('/check-slug/:slug', (req, res, next) => {
    console.log("Request reached check-slug route:", req.params.slug);
    next();
}, checkSlugAvailability);

// Protected Routes (Dashboard)
router.post('/create', protect, upload.single('logo'), createBusiness);
router.put('/:id', protect, upload.single('logo'), updateBusiness);
router.get("/me", protect, getBusinessByUser)

// Public Routes (The actual Link-in-Bio page)
router.get('/:identifier', getBusinessByIdentifier);

module.exports = router;
