import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../Redux/postSlice.js";

const HomePage = () => {
  const [postType, setPostType] = useState("trending");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const isTrending = postType === "trending";
        const endpoint = isTrending
          ? `${import.meta.env.VITE_BACKEND_URL}/api/tastes`
          : `${import.meta.env.VITE_BACKEND_URL}/api/tastes/friends-posts`;

        const config = !isTrending
          ? {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json",
              },
            }
          : {};

        const res = await axios.get(endpoint, config);
        const data = isTrending
          ? Array.isArray(res.data.tastes) ? res.data.tastes : []
          : Array.isArray(res.data) ? res.data : [];

        dispatch(setPosts(data));
      } catch (err) {
        console.error(`Failed to fetch ${postType} posts:`, err);
        dispatch(setPosts([]));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [postType, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      {/* Toggle Buttons */}
      <div className="px-4 py-3 border-b border-gray-700 flex justify-center md:justify-start gap-4">
        {["trending", "friends"].map((type) => (
          <button
            key={type}
            onClick={() => setPostType(type)}
            className={`px-4 py-1 rounded-full text-sm transition-all duration-200 ${
              postType === type
                ? "bg-teal-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {type === "trending" ? "🔥 Trending" : "👥 Friends"}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 animate-pulse">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-400">No posts to show.</div>
          ) : (
            posts.map((post, idx) => (
              <PostCard key={post._id || idx} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
