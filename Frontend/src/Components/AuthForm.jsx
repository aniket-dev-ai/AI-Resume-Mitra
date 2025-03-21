import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRegisterUserMutation, useLoginUserMutation } from "../Features/Api/authApi";
import { setUser } from "../Features/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const response = await loginUser(data).unwrap();
        toast.success(`Welcome back, ${response.user.username}! 🎉`);
        dispatch(setUser(response.user));
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.user.token);
        navigate("/");
      } else {
        await registerUser(data).unwrap();
        toast.success("Account created successfully! 🚀");
      }
      reset();
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong! ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1E2A78] to-[#5A189A]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-lg p-8 w-96 border border-gray-300"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl font-semibold text-white text-center mb-6"
        >
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </motion.h2>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative"
            >
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                {...register("username", { required: !isLogin })}
                placeholder="Username"
                className="w-full px-10 py-2 border bg-transparent text-white border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.username && <p className="text-red-400 text-sm">Username is required</p>}
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.3, delay: 0.3 }}
            className="relative"
          >
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="w-full px-10 py-2 border bg-transparent text-white border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-400 text-sm">Valid email is required</p>}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative"
          >
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="w-full px-10 py-2 border bg-transparent text-white border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-400 text-sm">Password must be at least 6 characters</p>}
          </motion.div>

          <motion.button
            type="submit"
            disabled={isLoggingIn || isRegistering}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-500"
          >
            {isLoggingIn || isRegistering ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>
        {/* ✅ FORM END */}

        {/* ✅ TOGGLE BUTTON */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center text-gray-300 mt-4"
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <motion.button
            onClick={() => setIsLogin(!isLogin)}
            whileHover={{ scale: 1.05, color: "#FFF" }}
            transition={{ duration: 0.2 }}
            className="text-blue-400 hover:underline font-semibold"
          >
            {isLogin ? "Sign up" : "Login"}
          </motion.button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
