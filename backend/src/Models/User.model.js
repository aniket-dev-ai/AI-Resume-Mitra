import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profilePic: { type: String, default: "" },
    bio: { type: String, maxlength: 300 },
    contact: { type: String },
    location: { type: String },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      portfolio: { type: String },
    },
    preferences: {
      jobAlerts: { type: Boolean, default: true },
      roadmapUpdates: { type: Boolean, default: true },
      interviewPrep: { type: Boolean, default: true },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
