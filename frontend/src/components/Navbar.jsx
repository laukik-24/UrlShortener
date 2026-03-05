import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const { logout, token } = useAuth();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <nav className="flex justify-between items-center p-4 shadow">

      <Link to="/" className="text-xl font-bold text-blue-600">
        🔗 Shortify
      </Link>

      {!isAuthPage && token && (
        <div className="flex gap-4 items-center">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}