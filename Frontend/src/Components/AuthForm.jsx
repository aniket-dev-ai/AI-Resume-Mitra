import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "../Features/Api/authApi";
import { setUser } from "../Features/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Redirect if already authenticated (Fixed Infinite Loop)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Redux API Hooks
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();

  // ✅ Form Submit Function (Fixed)
  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const response = await loginUser(data).unwrap();
        toast.success(`Welcome back, ${response.user.username}! 🎉`);

        // ✅ Save to Redux and LocalStorage
        dispatch(setUser(response.user));
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.user.token);

        navigate("/"); // ✅ Redirect to home page
      } else {
        await registerUser(data).unwrap();
        toast.success("Account created successfully! 🚀");
      }
      reset(); // ✅ Reset form after success
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong! ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-400 via-yellow-300 to-white">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 border-t-4 border-orange-500">
        <h2 className="text-2xl font-semibold text-orange-600 text-center mb-6">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                {...register("username", { required: !isLogin })}
                placeholder="Username"
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">Username is required</p>
              )}
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Valid email is required</p>
            )}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoggingIn || isRegistering}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 disabled:bg-gray-400"
          >
            {isLoggingIn || isRegistering
              ? "Processing..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>
        {/* ✅ FORM END */}

        {/* ✅ TOGGLE BUTTON */}
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 hover:underline font-semibold"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
