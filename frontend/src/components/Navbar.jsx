import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link2 } from "lucide-react";

export default function Navbar() {
  const { logout, token } = useAuth();

  return (
    <nav className="glass px-8 py-4 flex justify-between items-center sticky">
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-indigo-400">
        <Link2 size={20} />
        ClipNex
      </Link>

      <div className="flex gap-6 items-center">
        {token && (
          <>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded btn-animate">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
