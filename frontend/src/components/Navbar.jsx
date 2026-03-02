import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          🔗 Shortify
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
