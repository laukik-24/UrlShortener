import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const { logout, token } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 shadow">

      <Link to="/" className="text-xl font-bold text-blue-600">
        🔗 Shortify
      </Link>

      <div className="flex gap-4 items-center">

        {!token && (
          <>
            <Link
              to="/login"
              className="text-blue-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Signup
            </Link>
          </>
        )}

        {token && (
          <>
            <Link
              to="/dashboard"
              className="font-medium"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}