import { useEffect, useState } from "react";
import API from "../api/axios";
import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link2, MousePointerClick, LogOut } from "lucide-react";

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

  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };

  const totalLinks = urls.length;
  const totalClicks = urls.reduce((acc, url) => acc + url.clicks, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <Link2 size={28} />
            ClipNex Dashboard
          </h1>

          {/* <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-all duration-200 hover:scale-105">
            <LogOut size={18} />
            Logout
          </button> */}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 text-indigo-400">
              <Link2 size={22} />
              <h2 className="text-lg font-semibold">Total Links</h2>
            </div>

            <p className="text-3xl font-bold mt-2">{totalLinks}</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 text-indigo-400">
              <MousePointerClick size={22} />
              <h2 className="text-lg font-semibold">Total Clicks</h2>
            </div>

            <p className="text-3xl font-bold mt-2">{totalClicks}</p>
          </div>
        </div>

        {/* URL Form */}
        <div className="mb-10">
          <UrlForm refreshUrls={fetchUrls} />
        </div>

        {/* URL Table */}
        <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center py-10 text-slate-400">
              Loading your URLs...
            </div>
          ) : (
            <UrlTable urls={urls} refreshUrls={fetchUrls} />
          )}
        </div>
      </div>
    </div>
  );
}
