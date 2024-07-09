import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import articleRoutes from './routes/article.js';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/articles', articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
