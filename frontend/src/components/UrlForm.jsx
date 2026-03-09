import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Link2, Sparkles, Copy } from "lucide-react";

export default function UrlForm({ refreshUrls }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/url/shorten", {
        original_url: url,
        custom_code: customCode || null,
      });

      setShortUrl(res.data.short_url);

      toast.success("Short URL Created 🚀");

      setUrl("");
      setCustomCode("");

      refreshUrls();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed creating URL");
    }

    setLoading(false);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-lg mb-10">
      <form onSubmit={handleShorten} className="space-y-4">
        {/* Long URL Input */}
        <div className="relative">
          <Link2 className="absolute left-3 top-3 text-slate-400" size={18} />

          <input
            type="url"
            required
            placeholder="Paste your long URL here..."
            className="w-full bg-slate-800 border border-slate-700 rounded-md pl-10 pr-3 py-3 text-white focus:outline-none focus:border-indigo-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* Custom Code */}
        <input
          type="text"
          placeholder="Custom short code (optional)"
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-3 text-white focus:outline-none focus:border-indigo-500"
          value={customCode}
          onChange={(e) =>
            setCustomCode(
              e.target.value.replace(/\s/g, "").replace(/[^a-zA-Z0-9-_]/g, ""),
            )
          }
        />

        {/* Submit */}
        <button className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 py-3 rounded-md font-medium text-white hover:scale-[1.02]">
          <Sparkles size={18} />
          {loading ? "Creating..." : "Shorten URL"}
        </button>
      </form>

      {/* Short URL Preview */}
      {shortUrl && (
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-md p-4 flex justify-between items-center">
          <a
            href={shortUrl}
            target="_blank"
            className="text-indigo-400 hover:underline">
            {shortUrl}
          </a>

          <button
            onClick={copyUrl}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white text-sm">
            <Copy size={16} />
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
