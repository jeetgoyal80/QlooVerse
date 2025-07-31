import React, { useState, useRef } from "react";
import axios from "axios";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const suggestions = [
  "Suggest a horror movie",
  "Where to go in the rain?",
  "Best shows on Netflix",
  "Give me some thriller books",
];

export default function AssistantPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleSend = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const token = localStorage.getItem("Token");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recommend/query`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data?.message || "No reply received.");
    } catch {
      setResponse("Error contacting assistant.");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => e.key === "Enter" && handleSend();
  const handleSuggestionClick = (text) => { setQuery(text); handleSend(); };

  const toggleListening = () => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      return alert("Speech recognition not supported.");
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      const rec = new SR();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => { setQuery(e.results[0][0].transcript); handleSend(); };
      rec.onerror  = () => setListening(false);
      rec.onend    = () => setListening(false);
      recognitionRef.current = rec;
    }
    listening
      ? (recognitionRef.current.stop(), setListening(false))
      : (recognitionRef.current.start(), setListening(true));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-blue-400 drop-shadow-md">
            QlooVerse Recommender
          </h1>
          <p className="mt-2 text-gray-300">
            Ask me for movie picks, travel spots, books & more!
          </p>
        </motion.div>

        {/* Suggestions Pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          {suggestions.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => handleSuggestionClick(s)}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-blue-800/50 text-white text-sm rounded-full backdrop-blur-sm border border-blue-600 hover:bg-blue-700 transition"
            >
              {s}
            </motion.button>
          ))}
        </div>

        {/* Chat Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          {/* Input Row */}
          <div className="flex items-center px-6 py-4 gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type or say something…"
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-2 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow"
            >
              Send
            </button>
            <button
              onClick={toggleListening}
              className={`p-2 rounded-full transition ${
                listening ? "text-red-400 animate-pulse" : "text-blue-400 hover:text-blue-500"
              }`}
            >
              {listening ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20" />

          {/* Response Area */}
          <div className="max-h-80 overflow-y-auto p-6 text-gray-100 space-y-4">
            {loading ? (
              <motion.div
                className="text-blue-300 text-center"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                Thinking...
              </motion.div>
            ) : response ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-invert max-w-none"
              >
                {response}
              </motion.div>
            ) : (
              <p className="text-gray-400 text-center">
                Your recommendations will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
