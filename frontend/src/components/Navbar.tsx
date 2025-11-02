import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../utils/useAuth";

export default function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Hide navbar only on dashboard pages
  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }

  // Smooth scroll to sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const delayedSection = document.getElementById(id);
        if (delayedSection) {
          delayedSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <nav className="backdrop-blur-md bg-white/70 shadow-md fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-12 py-5 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-md text-xl font-bold shadow-sm">
            B
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-800 hover:text-indigo-700 transition-colors">
            BSITFourSEE
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-12 text-lg font-medium">
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("blog")}
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Blog
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            About Us
          </button>

          {/* Login button */}
          <Link
            to="/login"
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
