import React from "react";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="hidden md:flex justify-between px-8 py-4 items-center bg-black shadow-md border-b border-gray-700">
      <h1 className="text-2xl font-bold text-teal-400">QlooVerse</h1>
      <div className="flex gap-8 text-white">
        <button onClick={() => navigate("/home")} className="hover:text-teal-400">Home</button>
        <button onClick={() => navigate("/explore")} className="hover:text-teal-400">Explore</button>
        <button onClick={() => navigate("/create")} className="hover:text-teal-400">Create</button>
      </div>
      <div className="flex gap-6 text-white">
        <button onClick={() => navigate("/assistant")} className="hover:text-teal-400">Assistant</button>
        <button onClick={() => navigate("/profile")} className="hover:text-teal-400">Profile</button>
      </div>
    </nav>
  );
};

export default TopNavbar;
