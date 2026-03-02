import { useEffect, useState } from "react";
import API from "../api/axios";
import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const res = await API.get("/url/my-urls");
      setUrls(res.data);
      setLoading(false);
    } catch {
      alert("Failed fetching URLs");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">URL Dashboard 🚀</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <UrlForm refreshUrls={fetchUrls} />

      {loading ? (
        <p>Loading URLs...</p>
      ) : (
        <UrlTable urls={urls} refreshUrls={fetchUrls} />
      )}
    </div>
  );
}
