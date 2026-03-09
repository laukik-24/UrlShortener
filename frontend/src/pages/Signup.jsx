import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock } from "lucide-react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", {
        email,
        password,
      });

      login(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google", {
        token: credentialResponse.credential,
      });

      login(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4">
      {/* Card */}
      <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-8 rounded-xl shadow-2xl w-full max-w-sm space-y-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-400">Create Account</h2>
          <p className="text-slate-400 text-sm mt-1">
            Start shortening links with ClipNex
          </p>
        </div>

        {/* Email Signup */}
        <form onSubmit={handleSignup} className="space-y-4">
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

          {/* Signup Button */}
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 py-2 rounded-md font-medium text-white hover:scale-[1.02]">
            Signup
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <div className="flex-1 h-px bg-slate-700"></div>
          OR
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Google Signup */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => console.log("Google Signup Failed")}
          />
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
