import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ import the Navbar

export default function Landing() {
  const [showButton, setShowButton] = useState(false);

  // Scroll visibility for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="text-gray-800 relative">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section
        id="hero"
        className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Share Your Stories with the{" "}
            <span className="text-indigo-600">IT World</span>
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            Create, publish, and engage with readers on our modern blogging
            platform — built for writers who focus on what matters most: their
            content.
          </p>

          <div className="mt-10">
            <Link
              to="/register"
              className="px-10 py-3 rounded-lg bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section
        id="features"
        className="py-20 bg-white border-t border-gray-100 text-center px-6"
      >
        <h2 className="text-4xl font-bold text-indigo-700 mb-8">
          Powerful Features for Writers
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Everything you need to write, publish, and share your thoughts with
          the world — beautifully and efficiently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="p-8 bg-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">
              ✍️ Easy Writing
            </h3>
            <p className="text-gray-600">
              Enjoy a distraction-free editor designed to let your ideas flow
              naturally.
            </p>
          </div>

          <div className="p-8 bg-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">
              🚀 Quick Publishing
            </h3>
            <p className="text-gray-600">
              Publish your stories in seconds and share them instantly with your
              readers.
            </p>
          </div>

          <div className="p-8 bg-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">
              💬 Reader Engagement
            </h3>
            <p className="text-gray-600">
              Interact with your audience and build meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Blog Preview Section */}
      <section
        id="blog"
        className="py-20 bg-gradient-to-b from-indigo-50 to-indigo-100 text-center px-6"
      >
        <h2 className="text-4xl font-bold text-indigo-700 mb-8">From Our Blog</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover trending articles and the latest posts from our amazing
          community of writers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "The Billionaire Mindset",
              desc: "Exploring what drives success and how perspective shapes destiny.",
            },
            {
              title: "Developer Stress Levels",
              desc: "The mental side of coding — balancing creativity and burnout.",
            },
            {
              title: "The Human Heart",
              desc: "A reflection on compassion, empathy, and human connection.",
            },
          ].map((post, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 text-left transition"
            >
              <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.desc}</p>
              <Link
                to="/post"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ About Section */}
      <section id="about" className="py-20 bg-white text-center px-6">
        <h2 className="text-4xl font-bold text-indigo-700 mb-8">
          About Our Platform
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
          We believe everyone has a story worth telling. Our mission is to make
          blogging effortless, accessible, and inspiring — empowering creators
          from all walks of life to share their voices.
        </p>

        <div className="flex justify-center">
          <Link
            to="/register"
            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Join Our Community
          </Link>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-indigo-800 text-gray-200 py-10 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-3">My Blog</h3>
          <p className="text-gray-300 mb-6">
            Thoughts, stories, and ideas shared by people who love to create.
          </p>

          <div className="flex justify-center space-x-6 text-gray-300">
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <Link to="/post" className="hover:text-white">
              Blog
            </Link>
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
            <Link to="/register" className="hover:text-white">
              Register
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ✅ Scroll To Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
        >
          ↑
        </button>
      )}
    </main>
  );
}