import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      // Example: handle login success (store token, redirect)
      const { token } = response.data;
      localStorage.setItem("Token", token);

      // 🔁 Optionally save user info if returned
      // localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Login success:", response.data);
      navigate("/home");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 px-4">
      <motion.div
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-xl p-8 w-full max-w-sm"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* <motion.img
            src="https://source.unsplash.com/80x80/?space,avatar"
            alt="logo"
            className="w-16 h-16 mb-2 rounded-full shadow-md"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          /> */}
          <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white">
            QlooVerse
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Join your Qloo experience
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-gray-300 mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none"
              placeholder="•••••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold disabled:opacity-60"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </motion.form>

        <motion.p
          className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          New user?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
