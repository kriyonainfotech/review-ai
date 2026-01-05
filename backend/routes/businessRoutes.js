import express from 'express';
import { createBusiness, getBusinessByIdentifier, getBusinessByUser, updateBusiness } from '../controllers/businessController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../utils/cloudinary.js';

const router = express.Router();

// Protected Routes (Dashboard)
router.post('/create', protect, upload.single('logo'), createBusiness);
router.put('/:id', protect, upload.single('logo'), updateBusiness);

router.get("/me", protect, getBusinessByUser)

// Public Routes (The actual Link-in-Bio page)
router.get('/:identifier', getBusinessByIdentifier);

export default router;