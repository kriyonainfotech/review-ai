const Business = require('../models/Business');

const checkSlugAvailability = async (req, res) => {
    try {
        console.log("[checkSlugAvailability] req.params: ", req.params);
        const { slug } = req.params;
        console.log("[checkSlugAvailability] slug: ", slug);
        const business = await Business.findOne({ slug });
        console.log("[checkSlugAvailability] business: ", business);
        if (business) {
            console.log("[checkSlugAvailability] business found");
            return res.json({ available: false });
        }
        console.log("[checkSlugAvailability] business not found");
        res.json({ available: true });
    } catch (error) {
        console.log("[checkSlugAvailability] error: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Create new business profile
// @route   POST /api/business
// @access  Private
const createBusiness = async (req, res) => {
    const {
        googleReviewLink,
        slug,
        businessId,
        businessName,
        businessDescription,
        businessServices,
        primaryColor,
        secondaryColor
    } = req.body;

    console.log("[createBusiness] req.body: ", req.body);
    console.log("[createBusiness] req.file: ", req.file);
    try {
        // Check if slug is taken
        const slugExists = await Business.findOne({ slug });
        if (slugExists) {
            console.log("Slug already exists");
            return res.status(400).json({ message: 'URL already taken' });
        }

        // Check if businessId is taken
        const businessIdExists = await Business.findOne({ businessId });
        if (businessIdExists) {
            console.log("Business ID already exists");
            return res.status(400).json({ message: 'Business ID already exists' });
        }

        const logoUrl = req.file ? req.file.path : "";

        const business = await Business.create({
            user: req.user.id,
            slug,
            googleReviewLink,
            businessId,
            businessName,
            businessDescription,
            businessServices,
            primaryColor,
            secondaryColor,
            logoUrl,
            links: [], // Initialize empty
            reviews: []
        });

        console.log("[createBusiness] business: ", business);
        res.status(201).json(business);
    } catch (error) {
        console.log("[createBusiness] error: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get public business page data (by slug or businessId)
// @route   GET /api/business/:identifier
// @access  Public
const getBusinessByIdentifier = async (req, res) => {
    try {
        const { identifier } = req.params;
        const business = await Business.findOne({
            $or: [
                { slug: identifier },
                { businessId: identifier }
            ]
        });

        if (business) {
            res.json(business);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) return res.status(404).json({ message: 'Business not found' });

        // Verify ownership
        if (business.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Check if updated businessId is unique if it's being changed
        if (req.body.businessId && req.body.businessId !== business.businessId) {
            const businessIdExists = await Business.findOne({ businessId: req.body.businessId });
            if (businessIdExists) return res.status(400).json({ message: 'Business ID already exists' });
        }

        const updateData = { ...req.body };
        if (req.file) {
            updateData.logoUrl = req.file.path;
        }

        const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedBusiness);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getBusinessByUser = async (req, res) => {
    try {
        console.log("[getBusinessByUser] req.user.id: ", req.user.id);
        const business = await Business.findOne({ user: req.user.id });
        console.log("[getBusinessByUser] business: ", business);
        if (business) {
            res.json(business);
        } else {
            res.status(404).json({ message: 'Business not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    checkSlugAvailability,
    createBusiness,
    getBusinessByIdentifier,
    updateBusiness,
    getBusinessByUser
};
