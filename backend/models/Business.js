import mongoose from 'mongoose';

const businessSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    businessId: { type: String, required: true, unique: true, trim: true },
    businessName: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // unique url: /bio/my-business
    businessDescription: { type: String, default: "" },
    businessServices: { type: String, default: "" },
    googleReviewLink: { type: String, required: true },
    logoUrl: { type: String },
    primaryColor: { type: String, default: '#3b82f6' },
    secondaryColor: { type: String, default: '#ffffff' },
    theme: { type: String, default: 'light' },
    links: [{
        type: { type: String, required: true }, // e.g., 'instagram', 'website', 'whatsapp'
        url: { type: String, required: true },
        label: { type: String },
        isActive: { type: Boolean, default: true }
    }],
    reviews: [{
        text: String,
        author: String,
        rating: Number
    }] // AI Generated suggestions
}, { timestamps: true });

export default mongoose.model('Business', businessSchema);