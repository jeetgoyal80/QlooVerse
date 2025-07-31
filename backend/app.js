import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import tasteRoutes from './routes/tasteRoutes.js'
import recommendationRoutes from './routes/recommendationRoutes.js';
import friendRoutes from './routes/Frineds.js'
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tastes', tasteRoutes);
app.use('/api/recommend', recommendationRoutes);
app.use('/api/connection',friendRoutes);


export default app;
