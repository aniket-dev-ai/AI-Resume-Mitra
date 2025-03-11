import express from "express";
import { AIHRFriendlyAnswer, AISkillsBased30Questions,  enhanceResume } from "../controller/Ai.controller.js";
import authMiddleware from "../MiddleWaare/Auth.js"; // ✅ Middleware for authentication

const router = express.Router();

router.post("/enhance", authMiddleware, enhanceResume);
router.post("/Questions/",AISkillsBased30Questions)
router.post("/QnA",AIHRFriendlyAnswer) 

export default router;
