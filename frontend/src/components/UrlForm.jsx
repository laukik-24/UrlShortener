import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

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

      toast.success("Short URL Created ✅");

      setUrl("");
      setCustomCode("");

      refreshUrls();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed creating URL");
    }

    setLoading(false);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleShorten} className="space-y-3">
        {/* Original URL */}
        <input
          type="url"
          required
          placeholder="Enter long URL..."
          className="border p-3 w-full rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {/* Custom Code */}
        <input
          type="text"
          placeholder="Custom short code (optional)"
          className="border p-3 w-full rounded"
          value={customCode}
          onChange={(e) =>
            setCustomCode(
              e.target.value.replace(/\s/g, "").replace(/[^a-zA-Z0-9-_]/g, ""),
            )
          }
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded w-full">
          {loading ? "Creating..." : "Shorten URL"}
        </button>
      </form>
    </div>
  );
}
