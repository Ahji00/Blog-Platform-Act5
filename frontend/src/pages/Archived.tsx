import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  author?: string;
  date?: string;
}

export default function Archived() {
  const [archivedPosts, setArchivedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedArchived = JSON.parse(localStorage.getItem("archivedPosts") || "[]");
    setArchivedPosts(savedArchived);
  }, []);

  const handleUnarchive = (postId: number) => {
    const updatedArchived = archivedPosts.filter((p) => p.id !== postId);
    const unarchivedPost = archivedPosts.find((p) => p.id === postId);

    // Update archived posts
    localStorage.setItem("archivedPosts", JSON.stringify(updatedArchived));
    setArchivedPosts(updatedArchived);

    // Return post to normal posts list
    if (unarchivedPost) {
      const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const updatedPosts = [...allPosts, unarchivedPost];
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-indigo-100 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Archived Posts</h1>
        </div>

        {/* Posts */}
        {archivedPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No archived posts yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {archivedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 text-sm mb-4 whitespace-pre-line">
                  {post.content}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.author || "Unknown"}</span>
                  <span>{post.date || ""}</span>
                </div>
                <button
                  onClick={() => handleUnarchive(post.id)}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Unarchive
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
