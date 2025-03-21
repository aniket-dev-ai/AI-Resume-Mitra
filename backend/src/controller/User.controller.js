import User from "../Model/User.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();

// Helper function for error logging
const logError = (msg, error) => {
  console.error(`❌ ERROR: ${msg}`, error);
};

// ✅ REGISTER USER
export const registerUser = async (req, res) => {
  console.log("🔵 Register API hit");

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("⚠️ Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log(`⚠️ User already exists: ${email}`);
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔐 Password hashed successfully");

    // Create new user
    user = new User({ username, email, password: hashedPassword });
    await user.save();
    console.log(`✅ New user registered: ${email}`);

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("🔑 JWT Token generated");

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    logError("Failed to register user", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ LOGIN USER
export const loginUser = async (req, res) => {
  console.log("🔵 Login API hit");

  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      console.log(`⚠️ User not found: ${email}`);
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`⚠️ Incorrect password for user: ${email}`);
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token)
    console.log(`✅ User logged in: ${email}`);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

    res.json({ msg: "Login successful", token,user:{
        id: user._id,
        username: user.username,
        email: user.email,
    } });
  } catch (error) {
    logError("Failed to login user", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ GET USER BY ID
export const getUser = async (req, res) => {
  console.log("🔵 Get User API hit");

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log(`⚠️ User not found: ${req.params.id}`);
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(`✅ User found: ${user.email}`);
    res.json(user);
  } catch (error) {
    logError("Failed to get user", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ UPDATE USER
export const updateUser = async (req, res) => {
  console.log("🔵 Update User API hit");

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      console.log(`⚠️ User not found: ${req.params.id}`);
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user details
    user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`✅ User updated: ${user.email}`);

    res.json(user);
  } catch (error) {
    logError("Failed to update user", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ DELETE USER
export const deleteUser = async (req, res) => {
  console.log("🔵 Delete User API hit");

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log(`⚠️ User not found: ${req.params.id}`);
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    console.log(`✅ User deleted: ${user.email}`);

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    logError("Failed to delete user", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ GET ALL USERS
export const getAllUsers = async (req, res) => {
  console.log("🔵 Get All Users API hit");

  try {
    const users = await User.find();
    console.log(`✅ Total users found: ${users.length}`);

    res.json(users);
  } catch (error) {
    logError("Failed to fetch all users", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ LOGOUT USER
export const logoutUser = async (req, res) => {
  console.log("🔵 Logout API hit");

  try {
    res.clearCookie("token");
    console.log("✅ User logged out successfully");

    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    logError("Failed to logout user", error);
    res.status(500).json({ msg: "Server error" });
  }
};