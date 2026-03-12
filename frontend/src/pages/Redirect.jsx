import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Redirect() {
  const { code } = useParams();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    window.location.href = `${BASE_URL}/${code}`;
  }, [code, BASE_URL]);

  return (
    <div className="flex justify-center items-center h-screen text-white">
      Redirecting...
    </div>
  );
}
