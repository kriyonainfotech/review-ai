const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// app.use(cors()); // Allow frontend to communicate

app.use(cors({
    origin: ['http://localhost:5173', 'https://review-ai-chi.vercel.app', "https://www.revlinko.com"],
    credentials: true,
}));

app.use(express.json()); // Parse JSON bodies

// Routes
console.log("Mounting routes...");
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/reviews', reviewRoutes);
console.log("Routes mounted.");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
