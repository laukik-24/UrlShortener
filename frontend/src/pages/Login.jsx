import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock } from "lucide-react";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.access_token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google", {
        token: credentialResponse.credential,
      });

      login(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4">
      {/* Card */}
      <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-8 rounded-xl shadow-2xl w-full max-w-sm space-y-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-400">
            Login to ClipNex
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage your shortened links
          </p>
        </div>

        {/* Email Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full bg-slate-800 border border-slate-700 rounded-md pl-10 pr-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full bg-slate-800 border border-slate-700 rounded-md pl-10 pr-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 py-2 rounded-md font-medium text-white hover:scale-[1.02]">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <div className="flex-1 h-px bg-slate-700"></div>
          OR
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
          />
        </div>
        {/* Signup Link */}
        <p className="text-center text-sm text-slate-400">
          New here?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
