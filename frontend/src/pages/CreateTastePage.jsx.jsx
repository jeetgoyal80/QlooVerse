// ... (existing imports)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileImage, Sparkles, User, LocateFixed } from "lucide-react";
import axios from "axios";

const categories = [
  "Food", "Travel", "Music", "Art", "Technology", "Fashion", "Fitness",
  "Books", "Movies", "Photography", "Nature", "DIY", "Culture",
];

const CreateTaste = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [improving, setImproving] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImproveDescription = async () => {
    if (!formData.description.trim()) {
      return alert("Please enter a description first.");
    }

    try {
      setImproving(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recommend/improve`,
        { description: formData.description }
      );

      if (res.data?.improvedDescription) {
        setFormData((prev) => ({
          ...prev,
          description: res.data.improvedDescription,
        }));
      } else {
        alert("❌ Failed to improve the description.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error improving description.");
    } finally {
      setImproving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      image: null,
    });
    setImagePreview(null);
  };

  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported.");
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const readable = data?.display_name?.split(",").slice(0, 3).join(", ");
          setFormData((prev) => ({ ...prev, location: readable || "" }));
        } catch {
          alert("❌ Unable to get location");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        alert("❌ Location access denied");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tastes/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("✅ Taste created successfully!");
      resetForm();
    } catch (error) {
      console.error("Failed to create taste:", error);
      alert("❌ Failed to create taste");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Create a New Taste</h2>
            <p className="text-sm text-gray-400">Share your vibe with the world ✨</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Catchy headline"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-900/70 rounded-xl px-4 py-2 text-white border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center justify-between">
              <span>Description</span>
              <button
                type="button"
                onClick={handleImproveDescription}
                disabled={improving}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${
                  improving
                    ? "bg-teal-800 text-gray-300 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                <Sparkles size={14} />
                {improving ? "Improving..." : "Improve"}
              </button>
            </label>
            <textarea
              name="description"
              placeholder="Share your experience..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-900/70 rounded-xl px-4 py-2 text-white border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Location & Category */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 flex items-center justify-between">
                <span>Location</span>
                <button
                  type="button"
                  onClick={handleAutoLocation}
                  className="text-xs text-teal-300 hover:text-teal-400 flex items-center gap-1"
                >
                  <LocateFixed size={14} />
                  {loadingLocation ? "Fetching..." : "Use current"}
                </button>
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Delhi Sarojini Market"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-gray-900/70 rounded-xl px-4 py-2 text-white border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-900/70 rounded-xl px-4 py-2 text-white border border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition">
                <FileImage size={18} />
                <span>Browse</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  hidden
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md border border-gray-600 shadow"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold shadow-lg transition-all"
          >
            🚀 Create Taste
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateTaste;
