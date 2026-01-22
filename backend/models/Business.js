const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    businessId: { type: String, required: true, unique: true, trim: true },
    businessName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    businessDescription: { type: String, default: "" },
    businessServices: { type: String, default: "" },
    googleReviewLink: { type: String, required: false },
    logoUrl: { type: String },

    // --- NEW THEME FIELDS ---
    themeId: { type: String, default: 'clean_white' },
    customConfig: { type: String, default: null },     // Stores the JSON overrides as a string
    qrScanCount: { type: Number, default: 0 },
    // ------------------------

    // Keep these for backward compatibility if you want, or ignore them
    primaryColor: { type: String, default: '#3b82f6' },
    secondaryColor: { type: String, default: '#ffffff' },

    links: [{
        type: { type: String, required: true },
        url: { type: String, required: true },
        label: { type: String },
        isActive: { type: Boolean, default: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);