import toast from "react-hot-toast";
import API from "../api/axios";
import { Copy, Trash2, MousePointerClick, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function UrlTable({ urls, refreshUrls }) {
  const copy = (short_url) => {
    navigator.clipboard.writeText(short_url);
    toast.success("Copied!");
  };

  const deleteUrl = async (id) => {
    await API.delete(`/url/${id}`);
    toast.success("Deleted");
    refreshUrls();
  };

  const downloadQR = (short_url, code) => {
    const canvas = document.getElementById(`qr-${code}`);

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = `clipnex-${code}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {urls.map((url) => (
        <div
          key={url._id}
          className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-5 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-indigo-500 transition-all">
          {/* Left Side */}
          <div className="space-y-2">
            <p className="font-semibold text-slate-200 break-all">
              {url.original_url}
            </p>

            <a
              href={url.short_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline text-sm">
              {url.short_url}
            </a>

            <p className="flex items-center gap-2 text-sm text-slate-400">
              <MousePointerClick size={16} />
              {url.clicks} clicks
            </p>

            <p className="text-xs text-slate-500">
              Created: {new Date(url.created_at).toLocaleString()}
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* QR Code */}
            <div className="relative group hidden md:block">
              <QRCodeCanvas
                id={`qr-${url.short_code}`}
                value={url.short_url}
                size={70}
                bgColor="#020617"
                fgColor="#e2e8f0"
                includeMargin={true}
              />

              {/* Hover Overlay */}
              <button
                onClick={() => downloadQR(url.short_url, url.short_code)}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition rounded">
                <Download size={20} className="text-white" />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => copy(url.short_url)}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white text-sm transition hover:scale-105">
                <Copy size={16} />
                Copy
              </button>

              <button
                onClick={() => deleteUrl(url._id)}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm transition hover:scale-105">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
