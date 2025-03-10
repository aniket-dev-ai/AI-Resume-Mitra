import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import express from 'express';
import cors from 'cors';
import connect from './DataBase/DataBase.js';
import userRoutes from './Route/User.Route.js';
import resumeRoutes from './Route/Resume.Route.js'; // Uncomment if you have resume routes
import projectRoutes from './Route/Project.route.js'; // Uncomment if you have project routes
// import authMiddleware from './MiddleWaare/Auth.js'; // Uncomment if you have authentication middleware
import aiRoutes from './Route/Ai.Route.js'; // Uncomment if you have AI routes
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// Connect to DB
connect();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes); 
app.use('/api/projects', projectRoutes); // Uncomment if you have project routes
app.use('/api/ai', aiRoutes); // Uncomment if you have AI routes

export default app;
