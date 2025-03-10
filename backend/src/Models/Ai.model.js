import mongoose from "mongoose";

const aiSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    feature: { type: String, enum: ["Resume", "Roadmap", "Questions", "JobMatch"], required: true },
    requestData: { type: mongoose.Schema.Types.Mixed, required: true },
    aiResponse: { type: mongoose.Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("AI", aiSchema);
