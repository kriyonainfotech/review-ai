const Business = require('../models/Business');
const { generateReview } = require('../utils/aiService');

// @desc    Generate an AI review for a business
// @route   POST /api/reviews/generate/:slug
const generateAIReview = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(`\n--- Generate AI Review Request ---`);
        console.log(`Slug provided: ${slug}`);
        const business = await Business.findOne({ slug });

        if (!business) {
            console.log(`Error: Business with slug "${slug}" not found.`);
            return res.status(404).json({ message: "Business not found" });
        }

        console.log(`Found business: ${business.businessName}`);

        // const aiReview = await generateReview(
        //     business.businessName,
        //     business.businessDescription,
        //     business.businessServices
        // );

        const aiReview = "The ice creams here are absolutely delicious and taste so fresh! The staff is friendly and the place is super hygienic—highly recommend their mango ras.e price.";
        console.log(`Generated AI review: ${aiReview}`);

        res.json({ review: aiReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reviews for a business
// @route   GET /api/reviews/:slug
const getReviews = async (req, res) => {
    try {
        const { slug } = req.params;
        const business = await Business.findOne({ slug });

        if (!business) {
            return res.status(404).json({ message: "Business not found." });
        }
        res.json({ reviews: business.reviews || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new review (AI suggestion storage)
// @route   POST /api/reviews/:slug
const addReview = async (req, res) => {
    try {
        const { slug } = req.params;
        const { text, author, rating } = req.body;

        const updatedBusiness = await Business.findOneAndUpdate(
            { slug },
            { $push: { reviews: { $each: [{ text, author, rating }], $position: 0 } } },
            { new: true }
        );

        if (!updatedBusiness) {
            return res.status(404).json({ message: "Business not found." });
        }
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    generateAIReview,
    getReviews,
    addReview
};
