import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const [confirmBlurred, setConfirmBlurred] = useState(false);

  const handleConfirmBlur = () => {
    setConfirmBlurred(true);
    setConfirmError(confirmPassword !== password ? "Password doesn't match" : "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setConfirmBlurred(true);
    setConfirmError(confirmPassword !== password ? "Password doesn't match" : "");

    if (confirmPassword !== password) return;

    const userData = { username, email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setConfirmError("");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3 py-4 overflow-hidden">
      <div className="w-full max-w-xs bg-white p-6 rounded-2xl shadow-lg border border-indigo-100">
        <h2 className="text-xl font-extrabold mb-1 text-center text-indigo-600">
          Register
        </h2>
        <p className="text-center text-gray-600 mb-4 text-sm">
          Create account
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              placeholder="Enter username"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Enter email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-7 text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmBlur}
              required
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-2 top-7 text-gray-500 hover:text-indigo-600"
            >
              {showConfirmPassword ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>

            {confirmError && (
              <p className="text-red-600 text-xs mt-1 text-left">{confirmError}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-1.5 rounded-lg font-semibold text-xs hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-xs mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
