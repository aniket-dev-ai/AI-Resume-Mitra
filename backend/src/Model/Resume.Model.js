import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Resume must be linked to a user
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    linkedIn: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },
    schoolBoard: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],  
      required: true,
    },
    hobbies: {
      type: [String],  
    },
    softSkills: {
      type: [String], 
    },
    certifications: {
      type: [String],  
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',  
      },
    ],
    experience: {
      type: String, 
      trim: true,
    },
  },
  {
    timestamps: true,  
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
