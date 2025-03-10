import express from "express";
import { enhanceResume } from "../controller/Ai.controller.js";
import authMiddleware from "../MiddleWaare/Auth.js"; // ✅ Middleware for authentication

const router = express.Router();

router.post("/enhance", authMiddleware, enhanceResume);

export default router;
