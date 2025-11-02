import React, { useState, useEffect } from "react";
import {
  Eye,
  FileText,
  FileMinus,
  Calendar,
  Settings,
  Home,
  Search,
  LogOut,
  Heart,
  MessageCircle,
  Archive,
  X,
  Edit3,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface PostItem {
  title: string;
  excerpt: string;
  content: string;
  likes: number;
  comments: any[];
  expanded?: boolean;
  status: "Published" | "Draft";
  date: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [archivedPosts, setArchivedPosts] = useState<PostItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Published" | "Draft">("All");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [postToArchive, setPostToArchive] = useState<number | null>(null);
  const [viewPost, setViewPost] = useState<PostItem | null>(null);
  const [editPost, setEditPost] = useState<PostItem | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load posts
  useEffect(() => {
    const saved = localStorage.getItem("posts");
    const savedArchived = localStorage.getItem("archivedPosts");
    if (saved) setPosts(JSON.parse(saved));
    if (savedArchived) setArchivedPosts(JSON.parse(savedArchived));
  }, []);

  const savePosts = (updated: PostItem[]) => {
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const saveArchived = (updated: PostItem[]) => {
    setArchivedPosts(updated);
    localStorage.setItem("archivedPosts", JSON.stringify(updated));
  };

  // Stats
  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === "Published").length;
  const draftsCount = posts.filter((p) => p.status === "Draft").length;
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments.length, 0);

  const stats = [
    { title: "Total Posts", value: totalPosts, icon: <FileText className="text-indigo-500" /> },
    { title: "Published", value: publishedCount, icon: <Eye className="text-green-500" /> },
    { title: "Drafts", value: draftsCount, icon: <FileMinus className="text-yellow-500" /> },
    { title: "Total Likes", value: totalLikes, icon: <Heart className="text-red-500" /> },
    { title: "Total Comments", value: totalComments, icon: <MessageCircle className="text-indigo-400" /> },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" ? true : post.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Archive
  const handleArchiveClick = (index: number) => {
    setPostToArchive(index);
    setShowArchiveModal(true);
  };

  const confirmArchive = () => {
    if (postToArchive === null) return;
    const post = posts[postToArchive];
    const updatedPosts = posts.filter((_, i) => i !== postToArchive);
    const updatedArchived = [post, ...archivedPosts];
    savePosts(updatedPosts);
    saveArchived(updatedArchived);
    setShowArchiveModal(false);
    setPostToArchive(null);
  };

  const handleView = (post: PostItem) => setViewPost(post);

  const handleEdit = (post: PostItem, index: number) => {
    setEditPost({ ...post });
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    if (editPost && editIndex !== null) {
      const updated = [...posts];
      updated[editIndex] = editPost;
      savePosts(updated);
      setEditPost(null);
      setEditIndex(null);
    }
  };

  const handleLogout = () => setShowLogoutModal(true);
  const confirmLogout = () => navigate("/");
  const cancelLogout = () => setShowLogoutModal(false);
  const handleCreatePost = () => navigate("/post");

  const navItems = [
    { name: "Overview", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Posts", icon: <FileText size={20} />, path: "/dashboard/posts" },
    { name: "Drafts", icon: <FileMinus size={20} />, path: "/dashboard/drafts" },
    { name: "Archived", icon: <Archive size={20} />, path: "/dashboard/archived" },
    { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
  ];

  // Posts Table
  const renderPostsTable = (data: PostItem[], title: string) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-10">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-700">{title}</h2>
        {title !== "Archived Posts" && (
          <div className="relative w-48">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border px-2 py-1 pr-8 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs shadow-sm"
            />
            <Search size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center py-6 text-sm">No posts found.</p>
      ) : (
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="text-gray-500 border-b text-xs uppercase tracking-wide">
              <th className="py-3 px-4 w-1/3">Title</th>
              <th className="py-3 px-4 w-1/6">Status</th>
              <th className="py-3 px-4 w-1/6">Date</th>
              <th className="py-3 px-4 text-center w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((post, index) => (
              <tr key={index} className="border-b last:border-none hover:bg-indigo-50 transition">
                <td className="py-4 px-4">
                  <p className="font-semibold text-gray-800">{post.title}</p>
                  <p className="text-sm text-gray-500 truncate">{post.excerpt}</p>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      post.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm flex items-center gap-1">
                  <Calendar size={14} /> {post.date}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleView(post)}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      onClick={() => handleEdit(post, index)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleArchiveClick(index)}
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                      <Archive size={14} /> Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  let content;
  if (location.pathname.includes("/dashboard/archived")) {
    content = renderPostsTable(archivedPosts, "Archived Posts");
  } else if (location.pathname.includes("/dashboard/drafts")) {
    const drafts = posts.filter((p) => p.status === "Draft");
    content = renderPostsTable(drafts, "Drafts");
  } else {
    content = (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 rounded-xl bg-white shadow-md hover:shadow-lg hover:bg-indigo-50 transition"
            >
              <div>
                <p className="text-gray-500 text-xs uppercase">{stat.title}</p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h2>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          ))}
        </div>
        {renderPostsTable(filteredPosts, "Manage Your Posts")}
      </>
    );
  }

  return (
    <div className="flex bg-gradient-to-b from-gray-50 to-indigo-100 min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 top-0 bottom-0 bg-white shadow-xl flex flex-col justify-between p-5 z-40">
        <div>
          <div className="flex items-center gap-3 mb-8 border-b pb-4">
            <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-10 h-10 rounded-full border" />
            <div>
              <p className="font-semibold text-gray-800">Geraldine</p>
              <p className="text-gray-500 text-sm">Admin</p>
            </div>
          </div>
          <h2 className="text-xl font-bold text-indigo-700 mb-8">Dashboard</h2>
          <nav className="space-y-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="text-sm text-gray-500 border-t pt-4 mt-6">
          <p>© 2025 Blog Admin</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 px-6 py-10">{content}</main>

      {/* View Modal */}
      {viewPost && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full relative">
            <button
              onClick={() => setViewPost(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-indigo-700 mb-3">{viewPost.title}</h2>
            <p className="text-gray-600 italic mb-2">{viewPost.excerpt}</p>
            <p className="text-gray-800 whitespace-pre-line">{viewPost.content}</p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editPost && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full relative">
            <button
              onClick={() => setEditPost(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Edit Post</h2>
            <input
              type="text"
              value={editPost.title}
              onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
              className="border rounded-lg w-full px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400"
              placeholder="Title"
            />
            <input
              type="text"
              value={editPost.excerpt}
              onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })}
              className="border rounded-lg w-full px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-400"
              placeholder="Excerpt"
            />
            <textarea
              value={editPost.content}
              onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
              rows={5}
              className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-indigo-400"
              placeholder="Content"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditPost(null);
                  setEditIndex(null);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Modal */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center relative">
            <button
              onClick={() => setShowArchiveModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Move this post to archive?
            </h2>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmArchive}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                Yes
              </button>
              <button
                onClick={() => setShowArchiveModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;