import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaPlusCircle, FaRobot, FaUser } from "react-icons/fa";

const BottomNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-black text-white py-2 px-4 border-t border-gray-800 flex justify-between items-center rounded-t-2xl z-50">
      {[
        { icon: <FaHome size={20} />, label: "Home", route: "/home" },
        { icon: <FaSearch size={20} />, label: "Explore", route: "/explore" },
        { icon: <FaPlusCircle size={24} />, label: "Create", route: "/create" },
        { icon: <FaRobot size={20} />, label: "Assistant", route: "/assistant" },
        { icon: <FaUser size={20} />, label: "Profile", route: "/profile" },
      ].map((item, idx) => (
        <button
          key={idx}
          onClick={() => navigate(item.route)}
          className="flex flex-col items-center gap-1 text-sm hover:text-teal-400"
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default BottomNavbar;
