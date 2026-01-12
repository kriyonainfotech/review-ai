const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    businessId: { type: String, required: true, unique: true, trim: true },
    businessName: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // unique url: /bio/my-business
    phoneNumber: { type: String }, // Added phone number to business as well if needed, or use user's
    businessDescription: { type: String, default: "" },
    businessServices: { type: String, default: "" },
    googleReviewLink: { type: String, required: false }, // Make optional initially during setup
    logoUrl: { type: String },
    primaryColor: { type: String, default: '#3b82f6' },
    secondaryColor: { type: String, default: '#ffffff' },
    theme: { type: String, default: 'light' },
    links: [{
        type: { type: String, required: true }, // e.g., 'instagram', 'website', 'whatsapp'
        url: { type: String, required: true },
        label: { type: String },
        isActive: { type: Boolean, default: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);
