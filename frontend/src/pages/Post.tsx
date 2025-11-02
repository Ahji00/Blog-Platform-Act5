import React, { useState, useEffect } from "react";
import {
  Pencil,
  Send,
  Heart,
  MessageCircle,
  Share2,
  Edit,
  LogOut,
  X,
  Reply,
} from "lucide-react";
import useAuth from "../utils/useAuth";

interface Comment {
  text: string;
  date: string;
  likes: number;
  replies: string[];
}

interface PostItem {
  title: string;
  excerpt: string;
  content: string;
  likes: number;
  comments: Comment[];
  expanded?: boolean;
  status: "Published" | "Draft";
  date: string;
  time: string;
  author?: string;
}

export default function Post() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  const savePosts = (updated: PostItem[]) => {
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim())
      return alert("Title and content are required!");

    const now = new Date();
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    const newPost: PostItem = {
      title,
      excerpt,
      content,
      likes: 0,
      comments: [],
      expanded: false,
      status: "Published",
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      author: currentUser?.username || "Unknown User",
    };

    const updated = [newPost, ...posts];
    savePosts(updated);
    resetForm();
  };

  const handleSaveDraft = () => {
    if (!title.trim()) return alert("Please add a title before saving as draft!");
    const now = new Date();
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    const newPost: PostItem = {
      title,
      excerpt,
      content,
      likes: 0,
      comments: [],
      expanded: false,
      status: "Draft",
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      author: currentUser?.username || "Unknown User",
    };
    const updated = [newPost, ...posts];
    savePosts(updated);
    alert("✅ Post saved as draft!");
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setShowModal(false);
  };

  const handleLikePost = (index: number) => {
    const updated = [...posts];
    updated[index].likes += 1;
    savePosts(updated);
  };

  const handleLikeComment = (postIndex: number, commentIndex: number) => {
    const updated = [...posts];
    updated[postIndex].comments[commentIndex].likes += 1;
    savePosts(updated);
  };

  const handleAddComment = (index: number) => {
    if (!newComment.trim()) return;
    const updated = [...posts];
    updated[index].comments.push({
      text: newComment,
      date: new Date().toLocaleString(),
      likes: 0,
      replies: [],
    });
    savePosts(updated);
    setNewComment("");
  };

  const handleReplyComment = (postIndex: number, commentIndex: number) => {
    const reply = prompt("Write your reply:");
    if (!reply) return;
    const updated = [...posts];
    updated[postIndex].comments[commentIndex].replies.push(reply);
    savePosts(updated);
  };

  const handleShare = () => {
    navigator.clipboard.writeText("https://myblogsite.com/post/123");
    alert("🔗 Post link copied!");
  };

  const handleLogout = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    setShowLogoutModal(false);
    window.location.href = "/";
  };
  const cancelLogout = () => setShowLogoutModal(false);

  const hasPosts = posts.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-100 flex flex-col items-center text-center p-8 relative">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6 max-w-5xl">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold text-indigo-800">My Blog Posts</h1>
          <p className="text-gray-600 text-lg mt-1">Thoughts, Stories and Ideas</p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg font-medium transition"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Floating Create Button */}
      {hasPosts && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50"
        >
          <Pencil className="w-6 h-6" />
        </button>
      )}

      {/* No Post Yet Section */}
      {!hasPosts && (
        <div className="flex flex-col items-center justify-center mt-40 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">No post yet</h2>
          <p className="text-gray-500 text-sm">Be the first to share your thoughts</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            <Pencil size={16} /> Create New Post
          </button>
        </div>
      )}

      {/* Posts Display */}
      {hasPosts && (
        <div className="w-full max-w-4xl mt-8 space-y-6">
          {posts
            .filter((p) => p.status === "Published")
            .map((post, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl p-6 text-left border border-gray-100 hover:shadow-xl transition"
              >
                <div className="mb-3 text-sm text-gray-500">
                  <p className="font-semibold text-indigo-600">
                    👤 {post.author || "Unknown User"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {post.date} • {post.time}
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-indigo-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 italic mb-3">
                  {post.excerpt || "No description."}
                </p>

                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                {/* Like / Comment / Share */}
                <div className="flex justify-around mt-4 pt-3 border-t text-sm text-gray-600">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikePost(index);
                    }}
                    className="flex items-center space-x-2 hover:text-red-500 transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        post.likes > 0 ? "text-red-500 fill-red-500" : ""
                      }`}
                    />
                    <span>Like {post.likes}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCommentPost(activeCommentPost === index ? null : index);
                    }}
                    className="flex items-center space-x-2 hover:text-indigo-600 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment {post.comments.length}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                    className="flex items-center space-x-2 hover:text-indigo-600 transition"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comments Section */}
                {activeCommentPost === index && (
                  <div className="mt-4 border-t pt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <button
                        onClick={() => handleAddComment(index)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        <Send size={16} />
                      </button>
                    </div>

                    {/* List of Comments */}
                    <div className="mt-4 space-y-3 text-sm text-gray-700">
                      {post.comments.map((comment, cIndex) => (
                        <div
                          key={cIndex}
                          className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                        >
                          <p>{comment.text}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <button
                              onClick={() => handleLikeComment(index, cIndex)}
                              className="flex items-center space-x-1 hover:text-red-500 transition"
                            >
                              <Heart
                                size={14}
                                className={`${
                                  comment.likes > 0 ? "text-red-500 fill-red-500" : ""
                                }`}
                              />
                              <span>Like {comment.likes}</span>
                            </button>

                            <button
                              onClick={() => handleReplyComment(index, cIndex)}
                              className="flex items-center space-x-1 hover:text-indigo-600 transition"
                            >
                              <Reply size={14} />
                              <span>Reply {comment.replies.length}</span>
                            </button>

                            <span>{comment.date}</span>
                          </div>

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="mt-2 pl-4 border-l border-gray-200 space-y-1 text-gray-600 text-sm">
                              {comment.replies.map((reply, rIndex) => (
                                <p key={rIndex}>↳ {reply}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Create Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              Create New Post
            </h2>

            <div className="mb-4 text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Write your title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="mb-4 text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                placeholder="Add a short description (Optional)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <textarea
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full mb-6 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleSaveDraft}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-5 py-2 rounded-lg font-medium transition"
              >
                Save as Draft
              </button>
              <button
                onClick={handlePublish}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}