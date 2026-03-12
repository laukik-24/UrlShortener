import { useParams } from "react-router-dom";
import { useEffect } from "react";
import API from "../api/axios";

export default function Redirect() {
  const { shortCode } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await API.get(`/${shortCode}`);

        window.location.href = res.data.original_url;
      } catch {
        alert("Invalid or expired link");
      }
    };

    redirect();
  }, [shortCode]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      Redirecting...
    </div>
  );
}
