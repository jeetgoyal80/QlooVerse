import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setPosts, logout } from "../Redux/userSlice.js";

function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.user.posts);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("Token");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const userData = res.data?.user || res.data;
    
        

        dispatch(setUser(userData));
        dispatch(setPosts(res.data?.posts || []));
      } catch (err) {
        console.error("Error fetching user or posts:", err);
      }
    };

    if (!user) fetchUser();
  }, [dispatch, user]);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    dispatch(logout());
    navigate("/login");
  };

  if (!user)
    return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePic || "https://i.imgur.com/6VBx3io.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-pink-500 object-cover"
            />
            <div>
              <h2 className="text-3xl font-bold">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => navigate("/edit-profile")}
              className="text-sm px-5 py-2"
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              className="text-sm px-5 py-2 bg-gradient-to-r from-purple-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Bio</h3>
            <p className="text-gray-300">{user.bio}</p>
          </div>
        )}

        {/* Tastes */}
        {user.tastes && Object.keys(user.tastes).some((key) => user.tastes[key]?.length) && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3">Your Tastes</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(user.tastes).map(([key, values]) =>
                values.map((taste, idx) => (
                  <span
                    key={`${key}-${idx}`}
                    className="bg-pink-700 bg-opacity-20 border border-pink-500 text-pink-300 px-4 py-1 rounded-full text-sm"
                  >
                    #{taste}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Posts */}
        <div>
          <h3 className="text-2xl font-semibold mb-20">Your Posts</h3>
          {posts.length === 0 ? (
            <p className="text-gray-500">You haven't posted anything yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-[#1c1c1c] border border-[#333] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-200"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-white">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-400">{post.location}</p>
                    <p className="text-sm text-gray-300 mt-1">
                      {post.description?.slice(0, 80)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
