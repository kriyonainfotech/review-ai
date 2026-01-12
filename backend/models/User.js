const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: false }, // Optional at first step
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    password: { type: String, required: false }, // Optional initially
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
