import React, { useState } from "react";
import { Card, CardContent } from "./card";
import { Heart, MessageCircle, MapPin } from "lucide-react";
import moment from "moment";
import axios from "axios";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(
    post.likes?.includes(localStorage.getItem("UserId")) || false
  );
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [comments] = useState(post.comments?.length || 0);

  const toggleLike = async () => {
    try {
      const token = localStorage.getItem("Token");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tastes/taste/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update UI
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <Card className="bg-zinc-900 border border-zinc-700 mb-6 rounded-2xl transition-shadow hover:shadow-lg shadow-teal-400/10">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <img
              src={
                post?.user?.profilePic ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP1kYOtcmiYvasfXPPOYgbn7Z5nx2EOPDMJg&s"
              }
              alt="user"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-white">
                {post.user?.email?.split("@")[0]}
              </h4>
              <p className="text-xs text-gray-400">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>
          <span className="text-xs text-teal-400 px-2 py-1 rounded-full border border-teal-400">
            #{post.category}
          </span>
        </div>

        {/* Image */}
        <div className="rounded-xl overflow-hidden mb-3">
          <img
            src={post.imageUrl}
            alt="post"
            className="w-full h-52 object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Content */}
        <h3 className="text-white text-md font-semibold mb-1">{post.title}</h3>
        <p className="text-gray-300 text-sm">{post.description}</p>

        {/* Location */}
        {post.location && (
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-2">
            <MapPin className="w-4 h-4" />
            <span>{post.location}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-4 text-gray-400">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1 hover:text-red-500 transition ${
              liked ? "text-red-500" : ""
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
            <span className="text-sm">{likes}</span>
          </button>

          <button className="flex items-center gap-1 hover:text-blue-400 transition">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{comments}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
