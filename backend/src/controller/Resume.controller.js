import Resume from "../Model/Resume.Model.js"; // Import Resume model
import mongoose from "mongoose"; // Import mongoose for ObjectId conversion

// Helper function for error logging
const logError = (msg, error) => {
  console.error(`❌ ERROR: ${msg}`, error);
};

// ✅ CREATE RESUME
export const createResume = async (req, res) => {
  console.log("🔵 Create Resume API hit");
  console.log("User ID:", req.user.id);

  try {
    const {
      name,
      phone,
      email,
      linkedIn,
      github,
      schoolName,
      schoolBoard,
      degree,
      collegeName,
      skills,
      hobbies,
      softSkills,
      certifications,
      experience,
    } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ msg: "Candidate name, phone, and email are required." });
    }

    const newResume = new Resume({
      user: req.user.id,
      name,
      phone,
      email,
      linkedIn,
      github,
      schoolName,
      schoolBoard,
      degree,
      collegeName,
      skills,
      hobbies,
      softSkills,
      certifications,
      experience,
    });

    await newResume.save();
    console.log("✅ Resume created successfully");
    res.status(201).json(newResume);
  } catch (error) {
    logError("Failed to create resume", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ GET RESUME BY USER ID
export const getResumeByUser = async (req, res) => {
  console.log("🔵 Get Resume API hit");

  try {
    const resume = await Resume.findOne({ user: req.params.userId });

    if (!resume) {
      console.log(`⚠️ Resume not found for user: ${req.params.userId}`);
      return res.status(404).json({ msg: "Resume not found" });
    }

    console.log(`✅ Resume fetched for user: ${req.params.userId}`);
    res.json(resume);
  } catch (error) {
    logError("Failed to fetch resume", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ UPDATE RESUME
export const updateResume = async (req, res) => {
  console.log("🔵 Update Resume API hit");

  try {
    let resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      console.log(`⚠️ Resume not found for user: ${req.user.id}`);
      return res.status(404).json({ msg: "Resume not found" });
    }

    resume = await Resume.findOneAndUpdate({ user: req.user.id }, req.body, { new: true, runValidators: true });
    console.log(`✅ Resume updated for user: ${req.user.id}`);

    res.json(resume);
  } catch (error) {
    logError("Failed to update resume", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ DELETE RESUME
export const deleteResume = async (req, res) => {
  console.log("🔵 Delete Resume API hit");

  try {
    const resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      console.log(`⚠️ Resume not found for user: ${req.user.id}`);
      return res.status(404).json({ msg: "Resume not found" });
    }

    await Resume.findOneAndDelete({ user: req.user.id });
    console.log(`✅ Resume deleted for user: ${req.user.id}`);

    res.json({ msg: "Resume deleted successfully" });
  } catch (error) {
    logError("Failed to delete resume", error);
    res.status(500).json({ msg: "Server error" });
  }
};
