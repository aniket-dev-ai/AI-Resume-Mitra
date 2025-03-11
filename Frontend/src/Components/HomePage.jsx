import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Features/Slices/authSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // ✅ Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) navigate("/Auth");
  }, [isAuthenticated, navigate]);

  // ✅ Optimized Logout Function
  const handleLogout = () => {
    dispatch(logoutUser()); // Redux logout

    // Clear all local storage, session storage & cookies
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = `${cookie.split("=")[0]}=;expires=${new Date(0).toUTCString()};path=/`;
    });

    navigate("/Auth");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-orange-500 via-yellow-300 to-orange-600 text-white">
      {/* ✅ Hero Section */}
      <div className="w-full flex flex-col items-center text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg animate-fade-in">
          Welcome, {user?.username || "User"}! 🚀
        </h1>
        <p className="text-xl md:text-2xl mt-4 font-medium drop-shadow-md">
          Your **dream job** starts with a **powerful resume**! 💼
        </p>
      </div>

      {/* ✅ Motivational Sections */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12">
        {[
          {
            title: "🚀 The Power of a Great Resume",
            desc: "Recruiters spend **just 6 seconds** on a resume. Make yours count!",
          },
          {
            title: "💼 Get Your Dream Job",
            desc: "A polished resume **boosts interview calls** & helps you land **high-paying jobs**.",
          },
          {
            title: "🎯 Beat the Competition",
            desc: "In a **crowded job market**, only **top resumes** pass ATS filters & HR screening.",
          },
          {
            title: "📢 More Opportunities",
            desc: "A well-crafted resume **increases your chances** of getting offers from top companies.",
          },
        ].map(({ title, desc }, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-orange-500 text-gray-900 text-center transform hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-3">{title}</h2>
            <p className="text-lg text-gray-700">{desc}</p>
          </div>
        ))}
      </div>

      {/* ✅ Call to Action */}
      <div className="w-full bg-orange-700 py-12 mt-10 text-center shadow-xl">
        <h2 className="text-4xl font-extrabold text-white mb-4 animate-bounce">
          🎯 Take Your Career to the Next Level!
        </h2>
        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
          Don’t let a weak resume hold you back. Submit your resume now and let AI **enhance it to perfection**.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <Link
            to="/SubmitResume"
            className="bg-orange-500 text-white text-lg px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md"
          >
            ✍ Submit Resume
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
          >
            🔴 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
