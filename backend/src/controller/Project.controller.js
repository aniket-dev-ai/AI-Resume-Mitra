import Project from "../Model/Project.model.js";
import Course from "../Model/Resume.Model.js"; // Assuming you have a Course Model
import mongoose from "mongoose";

// Helper function for error logging
const logError = (msg, error) => {
  console.error(`❌ ERROR: ${msg}`, error);
};

// ✅ ADD PROJECT & PUSH INTO COURSE
export const addProject = async (req, res) => {
  console.log("🔵 Add Project API hit");

  try {
    const { courseId } = req.params;
    console.log(`🔍 Course ID: ${courseId}`);
    const { name, description, skills, githubLink, liveLink } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ msg: "Invalid Course ID" });
    }

    // Create new project
    const newProject = new Project({
      user: userId,
      name,
      description,
      skills,
      githubLink,
      liveLink,
    });

    await newProject.save();
    console.log("✅ Project Created:", newProject);

    // Push project ID into course's projects array
    await Course.findByIdAndUpdate(courseId, {
      $push: { projects: newProject._id },
    });

    console.log(`✅ Project added to Course: ${courseId}`);

    res.status(201).json(newProject);
  } catch (error) {
    logError("Failed to add project", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ EDIT PROJECT
export const editProject = async (req, res) => {
  console.log("🔵 Edit Project API hit");

  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    let project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      console.log(`⚠️ Project not found or unauthorized: ${projectId}`);
      return res.status(404).json({ msg: "Project not found" });
    }

    project = await Project.findByIdAndUpdate(projectId, req.body, {
      new: true,
    });
    console.log(`✅ Project updated: ${projectId}`);

    res.json(project);
  } catch (error) {
    logError("Failed to update project", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ DELETE PROJECT
export const deleteProject = async (req, res) => {
  console.log("🔵 Delete Project API hit");

  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    let project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      console.log(`⚠️ Project not found or unauthorized: ${projectId}`);
      return res.status(404).json({ msg: "Project not found" });
    }

    await Project.findByIdAndDelete(projectId);
    console.log(`✅ Project deleted: ${projectId}`);

    res.json({ msg: "Project deleted successfully" });
  } catch (error) {
    logError("Failed to delete project", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ GET PROJECT BY ID
export const getProject = async (req, res) => {
  console.log("🔵 Get Project API hit");

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      console.log(`⚠️ Project not found: ${req.params.id}`);
      return res.status(404).json({ msg: "Project not found" });
    }

    console.log(`✅ Project fetched: ${req.params.id}`);
    res.json(project);
  } catch (error) {
    logError("Failed to fetch project", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllProjects = async (req, res) => {
  console.log("🔵 Get All Projects API hit");

  try {
    const projects = await Project.find(req.userId).populate(
      "user",
      "name email"
    );
    if (!projects) {
      console.log(`⚠️ No projects found`);
      return res.status(404).json({ msg: "No projects found" });
    }

    console.log(`✅ All projects fetched`);
    res.json(projects);
  } catch (error) {
    logError("Failed to fetch all projects", error);
    res.status(500).json({ msg: "Server error" });
  }
};
