import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link2, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { logout, token, user } = useAuth();

  return (
    <nav className="glass px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-indigo-400">
        <Link2 size={20} />
        ClipNex
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {token && (
          <>
            {/* User Profile */}
            {user && (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <img
                  src={user.picture}
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-slate-600"
                />
                {user.name}
              </div>
            )}
            {/* Logout */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white btn-animate">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
