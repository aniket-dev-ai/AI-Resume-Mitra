import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import express from 'express';
import cors from 'cors';
import connect from './DataBase/DataBase.js';
import userRoutes from './Route/User.Route.js';
import resumeRoutes from './Route/Resume.Route.js';
import projectRoutes from './Route/Project.route.js';
import aiRoutes from './Route/Ai.Route.js';
import cookieParser from 'cookie-parser';

const app = express();

// ✅ Fix CORS Issue
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Connect to DB
connect();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes); 
app.use('/api/projects', projectRoutes);
app.use('/api/ai', aiRoutes);

export default app;
