import { useEffect, useState } from "react";
import { useCreateresumesMutation } from "../Features/Api/resumesApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setResume } from "../Features/Slices/resumeSlice";

const ResumeSubmit = () => {
  const haveResume = useSelector((state) => state.resume.resumeData);
  const navigate = useNavigate();
  useEffect(() => {
    if (haveResume) {
      navigate("/ShowResumePage");
    }
  }, [haveResume, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    linkedIn: "",
    github: "",
    schoolName: "",
    schoolBoard: "",
    degree: "",
    collegeName: "",
    skills: "",
    hobbies: "",
    softSkills: "",
    certifications: "",
    experience: "",
  });
  const dispatch = useDispatch();

  const [createresumes, { isLoading }] = useCreateresumesMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resumeData = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
        hobbies: formData.hobbies.split(",").map((h) => h.trim()),
        softSkills: formData.softSkills.split(",").map((s) => s.trim()),
        certifications: formData.certifications.split(",").map((c) => c.trim()),
      };

      await createresumes(resumeData);
      dispatch(setResume(resumeData));
      toast.success("Resume submitted successfully! 🚀");
      setFormData({
        name: "",
        phone: "",
        email: "",
        linkedIn: "",
        github: "",
        schoolName: "",
        schoolBoard: "",
        degree: "",
        collegeName: "",
        skills: "",
        hobbies: "",
        softSkills: "",
        certifications: "",
        experience: "",
      });
      navigate("/ShowResumePage");
    } catch (error) {
      toast.error("Failed to submit resume 😢");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-600 to-yellow-500 p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md shadow-xl rounded-lg p-8 border border-yellow-300">
        <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6">
          ✨ Submit Your Resume ✨
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Info */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
            required
          />
          <input
            type="text"
            name="linkedIn"
            placeholder="LinkedIn Profile"
            value={formData.linkedIn}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Profile"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
          />

          {/* Education */}
          <input
            type="text"
            name="schoolName"
            placeholder="School Name"
            value={formData.schoolName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
            required
          />
          <input
            type="text"
            name="schoolBoard"
            placeholder="School Board"
            value={formData.schoolBoard}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
            required
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
            required
          />
          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
            required
          />

          {/* Skills & Experience */}
          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
            required
          ></textarea>
          <textarea
            name="hobbies"
            placeholder="Hobbies (comma separated)"
            value={formData.hobbies}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
          ></textarea>
          <textarea
            name="softSkills"
            placeholder="Soft Skills (comma separated)"
            value={formData.softSkills}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
          ></textarea>
          <textarea
            name="certifications"
            placeholder="Certifications (comma separated)"
            value={formData.certifications}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
          ></textarea>
          <textarea
            name="experience"
            placeholder="Experience (optional)"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 border border-yellow-200 placeholder-white text-white focus:ring-2 focus:ring-yellow-300 outline-none"
          ></textarea>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-orange-900 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all"
            disabled={isLoading}
          >
            {isLoading
              ? "Submitting..."
              : "Submit Resume To Generate AI Response"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeSubmit;
