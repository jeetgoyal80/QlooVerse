// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import AuthPage from "./pages/AuthPage";
import Register from "./pages/Register";
import AssistantPage from "./pages/AssistantPage";

import TopNavbar from "./components/navigation/TopNavbar";
import BottomNavbar from "./components/navigation/BottomNavbar";
import CreateTastePage from "./pages/CreateTastePage.jsx";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import ExplorePage from "./pages/Explore";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNav && <TopNavbar />}
      {!hideNav && <BottomNavbar />}
      <div className={`pt-${!hideNav ? '16' : '0'} pb-${!hideNav ? '12' : '0'}`}>
        {children}
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/create" element={<CreateTastePage />} />
          <Route path="/profile" element={<UserProfile/>} />
           <Route path="/edit-profile" element={<EditProfile />} />
           <Route path="/explore" element={<ExplorePage/>} />
          {/* Future routes like /explore, /profile can go here */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
