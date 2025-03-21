import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Link project to a user
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    skills: {
      type: [String], 
      required: true,
    },
    githubLink: {
      type: String,
      // required: [true, 'GitHub link is required'],
      trim: true,
    },
    liveLink: {
      type: String,
      // required: [true, 'Live link is required'],
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
