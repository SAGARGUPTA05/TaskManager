import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222831]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#393E46] p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-[#DFD0B8] mb-4 text-center">
          Login
        </h2>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="bg-[#222831] text-[#DFD0B8] placeholder-[#948979] border border-[#948979] p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-[#222831] text-[#DFD0B8] placeholder-[#948979] border border-[#948979] p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
          required
        />

        <button
          type="submit"
          className="bg-[#DFD0B8] text-[#222831] font-semibold py-2 rounded w-full hover:bg-[#cfc0a8] transition-colors"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-[#948979]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#DFD0B8] hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
