import { Link } from "react-router-dom";
import { useGetresumesDetailsQuery } from "../Features/Api/resumesApi";
import { useGetAllProjectsQuery } from "../Features/Api/ProjectApi";
import { motion } from "framer-motion";

const ResumeShow = () => {
  const { data: resume, isLoading, isError } = useGetresumesDetailsQuery();
  const { data: projects } = useGetAllProjectsQuery();

  if (isLoading)
    return <div className="text-center text-yellow-400">Loading Resume...</div>;
  if (isError || !resume)
    return <div className="text-center text-red-500">Failed to load resume</div>;

  return (
    resume &&
    projects && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-600 to-yellow-500 p-6"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-3xl bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-8 border border-yellow-400"
        >
          {/* 📜 Resume Header */}
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl font-bold text-center text-orange-600 mb-6"
          >
            {resume.name}'s Resume
          </motion.h2>

          {/* 📨 Contact & Social Links */}
          <div className="text-center border-b pb-4 mb-4 border-gray-300">
            <p className="text-gray-700 text-lg">📧 {resume.email}</p>
            <p className="text-gray-700 text-lg">📞 {resume.phone}</p>
            <div className="flex justify-center gap-6 mt-3">
              {resume.linkedIn && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={resume.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  🔗 LinkedIn
                </motion.a>
              )}
              {resume.github && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={resume.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 font-semibold hover:underline"
                >
                  🖥 GitHub
                </motion.a>
              )}
            </div>
          </div>

          {/* 🎓 Education */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-orange-600 mb-2">🎓 Education</h3>
            <p className="text-gray-700">🏫 <strong>{resume.schoolName}</strong> ({resume.schoolBoard})</p>
            <p className="text-gray-700">🎓 <strong>{resume.degree}</strong> from {resume.collegeName}</p>
          </div>

          {/* 💡 Skills */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-orange-600 mb-2">💡 Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md"
                >
                  <Link to={`/Qna/${skill}`} className="text-white hover:underline">
                    {skill}
                  </Link>
                </motion.span>
              ))}
            </div>
          </div>

          {/* 🚀 Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-orange-600 mb-2">🚀 Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    <h4 className="text-lg font-semibold text-orange-700">{project.name}</h4>
                    <p className="text-gray-700 text-sm">{project.description}</p>
                    <div className="flex gap-4 mt-2">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                          🔗 GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm">
                          🌐 Live Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 📄 Resume Options */}
          <div className="text-center mt-6 flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.print()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all"
            >
              🖨 Print Resume
            </motion.button>
            <Link to="/ai-resume">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold text-lg hover:bg-blue-600 transition-all"
              >
                🤖 AI Enhance Resume
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default ResumeShow;
