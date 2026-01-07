import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

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
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;