import express from "express";
import {
  addProject,
  editProject,
  deleteProject,
  getProject,
  getAllProjects,
} from "../controller/Project.controller.js";
import authMiddleware from "../MiddleWaare/Auth.js"; // Middleware to protect routes

const router = express.Router();

router.post("/add/:courseId", authMiddleware, addProject);

router.put("/edit/:id", authMiddleware, editProject);

router.delete("/delete/:id", authMiddleware, deleteProject);

router.get("/get/:id", getProject);
router.get("/get", getAllProjects);

export default router;
