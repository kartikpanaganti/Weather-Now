import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [city, setCity] = useState<string>("");
  const [displayText, setDisplayText] = useState<string>("");

  const cityExamples = ["New York", "Mumbai", "Paris", "Tokyo", "Dubai"];

  useEffect(() => {
    let cityIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const currentCity = cityExamples[cityIndex];

      if (!deleting) {
        setDisplayText(currentCity.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentCity.length) {
          deleting = true;
          setTimeout(type, 1200); // pause on full word
          return;
        }
      } else {
        setDisplayText(currentCity.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          cityIndex = (cityIndex + 1) % cityExamples.length;
        }
      }
      setTimeout(type, deleting ? 60 : 120);
    };

    type();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-md bg-white/20 backdrop-blur-md p-2 rounded-2xl shadow-lg"
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-3 py-2 rounded-xl text-black focus:outline-none"
        />
        {!city && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            🔎 Search {displayText}
            <span className="animate-pulse">|</span>
          </span>
        )}
      </div>
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
