import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    appliedJobs: [
      {
        company: String,
        position: String,
        appliedDate: Date,
        status: { type: String, enum: ["Applied", "Interview", "Rejected", "Hired"], default: "Applied" },
      },
    ],
    savedJobs: [
      {
        company: String,
        position: String,
        jobLink: String,
      },
    ],
    recommendedJobs: [
      {
        company: String,
        position: String,
        skillsRequired: [String],
        jobLink: String,
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
