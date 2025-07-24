import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      setMsg("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setMsg("Error signing up");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 mb-2 px-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <button
        onClick={handleSignup}
        className="bg-green-500 text-white w-full py-2 rounded"
      >
        Signup
      </button>
      {msg && <p className="text-red-500 mt-2">{msg}</p>}
    </div>
  );
};

export default Signup;
