const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendOTPEmail } = require('../utils/mailService');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const sendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.deleteMany({ email }); // Remove old OTPs
        await OTP.create({ email, otp });
        const emailSent = await sendOTPEmail(email, otp);
        if (emailSent) {
            res.json({ message: 'OTP sent successfully' });
        } else {
            res.status(500).json({ message: 'Failed to send OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await OTP.findOne({ email, otp });
        if (otpRecord) {
            await OTP.deleteOne({ _id: otpRecord._id });
            res.json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password, phoneNumber, slug, businessName, services, googleReviewLink, logoUrl } = req.body;
    console.log("Registering user", req.body);
    try {
        const userExists = await User.findOne({ email });
        console.log("User exists", userExists);
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        let hashedPassword = null;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber
        });

        console.log("User created", user);
        if (user) {
            // If Business details are provided, we could create the business here or in a separate step
            // Based on the user request, the registration is multi-step. 
            // Usually, we create the user first, then the business.
            // But since this is a "finalize registration", we can handle it here or have a separate business creation.
            // The user wanted: email-otp -> slug -> business info -> password -> services.

            // To simplify, let's assume this registers both for now if data is present.
            // Actually, the frontend will probably send all at once after all steps.

            console.log("User created", user);
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        }
    } catch (error) {
        console.log("Error in register", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password, otp } = req.body;
    console.log(email, password, otp);
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: 'User not found' });
        }

        if (otp) {
            console.log("OTP login");
            // OTP login
            const otpRecord = await OTP.findOne({ email, otp });
            if (otpRecord) {
                await OTP.deleteOne({ _id: otpRecord._id });
                return res.json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user.id),
                });
            } else {
                return res.status(401).json({ message: 'Invalid or expired OTP' });
            }
        } else if (password) {
            console.log("Password login");
            // Password login
            if (user.password && (await bcrypt.compare(password, user.password))) {
                return res.json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user.id),
                });
            } else {
                console.log("Invalid credentials");
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            console.log("No password or OTP");
            res.status(400).json({ message: 'Password or OTP required' });
        }
    } catch (error) {
        console.log("Erroqr in login", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, sendOTP, verifyOTP };
