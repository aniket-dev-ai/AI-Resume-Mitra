import { useState } from "react";
import { useRegisterUserMutation, useLoginUserMutation } from "../Features/Api/authApi";

const AuthSection = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const handleAuth = async () => {
    if (isLogin) {
      await loginUser({ email, password });
    } else {
      await registerUser({ email, password });
    }
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-lg text-center">
      <h2 className="text-xl font-semibold text-orange-600">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mt-3"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mt-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="mt-3 bg-orange-500 text-white px-4 py-2 rounded">
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <p className="mt-2">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span className="text-orange-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? " Sign Up" : " Login"}
        </span>
      </p>
    </div>
  );
};

export default AuthSection;
