import { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function Redirect() {
  const { code } = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await API.get(`/url/redirect/${code}`);
        window.location.href = res.data.original_url;
      } catch (err) {
        console.error(err);
      }
    };

    fetchUrl();
  }, [code]);

  return (
    <div className="flex items-center justify-center h-screen">
      Redirecting...
    </div>
  );
}