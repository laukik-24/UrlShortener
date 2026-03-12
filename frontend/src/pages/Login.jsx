import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link2, Zap, BarChart3, Shield } from "lucide-react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google", {
        token: credentialResponse.credential,
      });

      login(res.data.access_token, res.data.user);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Main Section */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl w-full">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Shorten links.
              <span className="text-indigo-400">Track performance.</span>
              Share smarter.
            </h1>

            <p className="text-slate-400 text-lg">
              ClipNex is a modern URL shortener that helps you create clean
              links, track clicks, and manage your links effortlessly.
            </p>

            {/* Features */}
            <div className="space-y-4 text-slate-300">
              <div className="flex items-center gap-3">
                <Zap className="text-indigo-400" size={20} />
                Instant link shortening
              </div>

              <div className="flex items-center gap-3">
                <BarChart3 className="text-indigo-400" size={20} />
                Real-time click analytics
              </div>

              <div className="flex items-center gap-3">
                <Shield className="text-indigo-400" size={20} />
                Secure Google authentication
              </div>
            </div>
          </div>

          {/* RIGHT SIDE LOGIN CARD */}
          <div className="flex justify-center">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 rounded-xl shadow-2xl w-full max-w-sm space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-indigo-400">
                  Welcome to ClipNex
                </h2>

                <p className="text-slate-400 text-sm">
                  Continue with Google to manage your links
                </p>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.log("Google Login Failed")}
                />
              </div>

              <p className="text-xs text-slate-500 text-center">
                By continuing you agree to our Terms & Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
