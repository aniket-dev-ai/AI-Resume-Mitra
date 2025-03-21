import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Features/Slices/authSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!isAuthenticated) navigate("/Auth");
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = `${cookie.split("=")[0]}=;expires=${new Date(0).toUTCString()};path=/`;
    });

    navigate("/Auth");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#1E2A78] to-[#5A189A] text-white">
      
      {/* ✅ Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex flex-col items-center text-center py-20 px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Welcome, {user?.username || "User"}! 🚀
        </h1>
        <p className="text-xl md:text-2xl mt-4 font-medium drop-shadow-md">
          Your <strong>dream job</strong> starts with a <strong>powerful resume</strong>! 💼
        </p>
      </motion.div>

      {/* ✅ Motivational Sections */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12">
        {[
          { title: "🚀 The Power of a Great Resume", desc: "Recruiters spend **just 6 seconds** on a resume. Make yours count!" },
          { title: "💼 Get Your Dream Job", desc: "A polished resume **boosts interview calls** & helps you land **high-paying jobs**." },
          { title: "🎯 Beat the Competition", desc: "In a **crowded job market**, only **top resumes** pass ATS filters & HR screening." },
          { title: "📢 More Opportunities", desc: "A well-crafted resume **increases your chances** of getting offers from top companies." },
        ].map(({ title, desc }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-xl p-8 border border-gray-300 text-center transform hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-3">{title}</h2>
            <p className="text-lg text-gray-200">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ✅ Call to Action */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-opacity-10 backdrop-blur-lg py-12 mt-10 text-center shadow-xl border-t border-white"
      >
        <h2 className="text-4xl font-extrabold text-white mb-4 animate-bounce">
          🎯 Take Your Career to the Next Level!
        </h2>
        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
          Don’t let a weak resume hold you back. Submit your resume now and let AI <strong>enhance it to perfection</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/SubmitResume"
              className="bg-blue-500 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
            >
              ✍ Submit Resume
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
            >
              🔴 Logout
            </button>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};

export default HomePage;
  