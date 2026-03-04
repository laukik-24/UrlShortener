import toast from "react-hot-toast";
import API from "../api/axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function UrlTable({ urls, refreshUrls }) {

  const copy = (code) => {
    navigator.clipboard.writeText(`${BASE_URL}/${code}`);
    toast.success("Copied!");
  };

  const deleteUrl = async (id) => {
    await API.delete(`/url/${id}`);
    toast.success("Deleted");
    refreshUrls();
  };

  return (
    <div className="space-y-4">
      {urls.map((url) => (
        <div
          key={url._id}
          className="p-4 shadow rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{url.original_url}</p>

            <a
              href={`${BASE_URL}/${url.short_code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {`${BASE_URL}/${url.short_code}`}
            </a>

            <p className="text-sm text-gray-500">
              Clicks: {url.clicks}
            </p>

            <p className="text-xs text-gray-400">
              Created: {new Date(url.created_at).toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => copy(url.short_code)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Copy
            </button>

            <button
              onClick={() => deleteUrl(url._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}