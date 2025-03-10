import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    careerPath: { type: String, required: true },
    roadmapSteps: [
      {
        title: String,
        description: String,
        estimatedTime: String,
        resources: [{ title: String, link: String }],
        completed: { type: Boolean, default: false },
      },
    ],
    progress: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);
