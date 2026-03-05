import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/signup", {
        email,
        password
      });

      // Automatically log user in
      login(res.data.access_token);

      navigate("/dashboard");

    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">

      <form
        onSubmit={handleSignup}
        className="p-6 shadow-lg rounded w-80 space-y-4"
      >

        <h2 className="text-xl font-bold">Signup</h2>

        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2">
          Signup
        </button>

      </form>

    </div>
  );
}