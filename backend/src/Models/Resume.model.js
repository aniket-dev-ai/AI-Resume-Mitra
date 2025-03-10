import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    summary: { type: String, maxlength: 500 },
    skills: [{ type: String, required: true }],
    experience: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        year: Number,
      },
    ],
    certifications: [{ type: String }],
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        link: String,
      },
    ],
    languages: [{ type: String }],
    generatedByAI: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
