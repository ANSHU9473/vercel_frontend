import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
     
      const userId = res.data.userId; 
      localStorage.setItem("userId", userId);
      setIsLoggedIn(true);
      navigate("/tasks");
    } catch (err) {
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
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
        onClick={handleLogin}
        className="bg-blue-500 text-white w-full py-2 rounded"
      >
        Login
      </button>
      {msg && <p className="text-red-500 mt-2">{msg}</p>}
    </div>
  );
};

export default Login;
