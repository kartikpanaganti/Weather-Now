import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-md bg-white/20 backdrop-blur-md p-2 rounded-2xl shadow-lg"
    >
      <input
        type="text"
        placeholder="🔎 Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-3 py-2 rounded-xl text-black focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-md hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? (
          <span className="flex gap-1 justify-center">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </span>
        ) : (
          "Go"
        )}
      </button>
    </motion.form>
  );
}
