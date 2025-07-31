// src/pages/WelcomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse mb-2">
        QlooVerse
      </h1>
      <p className="text-sm text-gray-300 mb-4 text-center">
        Connect effortlessly with others.
      </p>

      {/* Loading animation */}
      <div className="flex space-x-2 mb-6">
        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></span>
      </div>

      <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full text-lg transition"
      >
        Join now
      </Link>
    </div>
  );
};

export default WelcomePage;
