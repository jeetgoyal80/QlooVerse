import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaPlusCircle,
  FaRobot,
  FaUser,
} from "react-icons/fa";

const navItems = [
  { to: "/", icon: FaHome, label: "Home" },
  { to: "/explore", icon: FaSearch, label: "Explore" },
  { to: "/create", icon: FaPlusCircle, label: "Create" },
  { to: "/assistant", icon: FaRobot, label: "AI" },
  { to: "/profile", icon: FaUser, label: "Profile" },
];

const Navbar = () => {
  return (
    <>
      {/* Top Navbar for large screens */}
      <nav className="hidden md:flex justify-between items-center px-8 py-4 bg-slate-800 text-white shadow-md">
        <h1 className="text-xl font-semibold">QlooVerse</h1>
        <div className="flex gap-6">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1 text-sm ${isActive ? "text-blue-400" : "text-white"}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Navbar for small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 text-white shadow-inner flex justify-around items-center py-2 z-50">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-blue-400" : "text-white"
              }`
            }
          >
            <Icon className="text-lg" />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
