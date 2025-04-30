import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222831]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#393E46] p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-[#DFD0B8] mb-4 text-center">
          Register
        </h2>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="bg-[#222831] text-[#DFD0B8] placeholder-[#948979] border border-[#948979] p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="bg-[#222831] text-[#DFD0B8] placeholder-[#948979] border border-[#948979] p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="bg-[#222831] text-[#DFD0B8] placeholder-[#948979] border border-[#948979] p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#DFD0B8]"
          required
        />

        <button
          type="submit"
          className="bg-[#DFD0B8] text-[#222831] font-semibold py-2 rounded w-full hover:bg-[#cfc0a8] transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
