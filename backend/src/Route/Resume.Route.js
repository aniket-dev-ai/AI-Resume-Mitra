import express from "express";
import {
  createResume,
  getResumeByUser,
  updateResume,
  deleteResume,
} from "../controller/Resume.controller.js";
import authMiddleware from "../MiddleWaare/Auth.js"; // ✅ Middleware for authentication

const router = express.Router();

router.post("/", authMiddleware, createResume); // ✅ Create Resume
router.get("/:userId", getResumeByUser); // ✅ Get Resume by User ID
router.put("/", authMiddleware, updateResume); // ✅ Update Resume
router.delete("/", authMiddleware, deleteResume); // ✅ Delete Resume

export default router;
