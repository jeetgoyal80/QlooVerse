import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/userSlice";

export default function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [profile, setProfile] = useState(user || {});
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(user?.profilePic || "");

  // 1️⃣ Fetch from API only if not in Redux
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setProfile(user);
        setPreview(user.profilePic);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setUser(res.data?.user || res.data));
        setProfile(res.data?.user || res.data);
        setPreview(res.data?.user?.profilePic || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch, user]);

  // 2️⃣ Text input
  const handleChange = (e) =>
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));

  // 3️⃣ File input
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfile((p) => ({ ...p, file }));
    setPreview(URL.createObjectURL(file));
  };

  // 4️⃣ Submit profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", profile.username);
    form.append("bio", profile.bio);
    form.append("gender", profile.gender);
    form.append("dob", profile.dob);
    form.append("location", profile.location);
    if (profile.file) form.append("profilePic", profile.file);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedUser = res.data?.user || res.data;
      dispatch(setUser(updatedUser)); // ✅ Update Redux
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading || !profile)
    return <div className="text-center mt-20 text-gray-400">Loading…</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-2xl text-white space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Edit Profile</h1>

        {/* Profile Pic */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500 mb-2">
            <img src={preview} alt="avatar" className="object-cover w-full h-full" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="text-sm text-gray-300"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            name="username"
            type="text"
            value={profile.username || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={profile.email || ""}
            readOnly
            className="w-full px-4 py-2 rounded-xl bg-white/10 text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            name="bio"
            rows={3}
            value={profile.bio || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Gender & DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={profile.gender || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Other</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={profile.dob?.substring(0, 10) || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            type="text"
            value={profile.location || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
