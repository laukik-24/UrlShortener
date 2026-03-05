import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Redirect() {

  const { code } = useParams();

  useEffect(() => {
    window.location.href =
      `https://shortify-s6hd.onrender.com/${code}`;
  }, [code]);

  return (
    <div className="flex justify-center items-center h-screen">
      Redirecting...
    </div>
  );
}