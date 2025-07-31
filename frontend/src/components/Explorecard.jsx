import React from "react";
import { Link } from "react-router-dom";

export default function ExploreCard({ image, title, category, description }) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">{category}</p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        <Link
          to="/assistant"
          className="text-blue-600 dark:text-blue-400 text-sm mt-3 inline-block hover:underline"
        >
          Ask Assistant →
        </Link>
      </div>
    </div>
  );
}
