import { useEffect, useState } from "react";
import { useCreateresumesMutation } from "../Features/Api/resumesApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setResume } from "../Features/Slices/resumeSlice";
import { motion } from "framer-motion";

const ResumeSubmit = () => {
  const haveResume = useSelector((state) => state.resume.resumeData);
  const navigate = useNavigate();
  useEffect(() => {
    if (haveResume) navigate("/ShowResumePage");
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-8 border border-gray-300"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="text-3xl font-extrabold text-center text-white mb-6"
        >
          ✨ Submit Your Resume ✨
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delayChildren: 0.2, staggerChildren: 0.1 },
            },
          }}
        >
          {/* Mapping Inputs */}
          {[
            { name: "name", placeholder: "Full Name", required: true },
            { name: "phone", placeholder: "Phone Number", required: true },
            { name: "email", placeholder: "Email Address", required: true },
            { name: "linkedIn", placeholder: "LinkedIn Profile" },
            { name: "github", placeholder: "GitHub Profile" },
            { name: "schoolName", placeholder: "School Name", required: true },
            { name: "schoolBoard", placeholder: "School Board", required: true },
            { name: "degree", placeholder: "Degree", required: true },
            { name: "collegeName", placeholder: "College Name", required: true },
          ].map(({ name, placeholder, required }) => (
            <motion.input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 border border-gray-200 placeholder-white text-white focus:ring-2 focus:ring-indigo-300 outline-none"
              required={required}
              whileFocus={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
          ))}

          {/* Textarea Inputs */}
          {[
            { name: "skills", placeholder: "Skills (comma separated)", required: true },
            { name: "hobbies", placeholder: "Hobbies (comma separated)" },
            { name: "softSkills", placeholder: "Soft Skills (comma separated)" },
            { name: "certifications", placeholder: "Certifications (comma separated)" },
            { name: "experience", placeholder: "Experience (optional)" },
          ].map(({ name, placeholder, required }) => (
            <motion.textarea
              key={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/20 border border-gray-200 placeholder-white text-white focus:ring-2 focus:ring-indigo-300 outline-none"
              required={required}
              whileFocus={{ scale: 1.05, transition: { duration: 0.2 } }}
            ></motion.textarea>
          ))}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold text-lg shadow-lg"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.6)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              opacity: [0.7, 1, 0.7, 1],
              scale: [1, 1.05, 1],
              transition: { repeat: Infinity, duration: 2 },
            }}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "🚀 Submit & Generate AI Resume"}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default ResumeSubmit;
