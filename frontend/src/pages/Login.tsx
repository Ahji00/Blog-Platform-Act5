import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../utils/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setErrorMessage("No registered account found. Please register first.");
      return;
    }

    const userData = JSON.parse(storedUser);

    if (email !== userData.email) {
      setErrorMessage("Email not found. Please register first.");
      return;
    }

    if (password !== userData.password) {
      setErrorMessage("Password doesn't match.");
      return;
    }

    setErrorMessage("");
    login({ email });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3 py-4 overflow-hidden">
      <div className="w-full max-w-xs bg-white p-6 rounded-2xl shadow-lg border border-indigo-100">
        <h2 className="text-xl font-extrabold mb-1 text-center text-indigo-600">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              required
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-7 text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>

          {/* Inline error message */}
          {errorMessage && (
            <p className="text-red-600 text-xs mt-1 text-left">{errorMessage}</p>
          )}

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-1.5 rounded-lg font-semibold text-xs hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-xs mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
