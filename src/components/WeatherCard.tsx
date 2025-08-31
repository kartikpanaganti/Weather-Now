import React from "react";
import { motion } from "framer-motion";

// define shape of weather data
interface WeatherData {
  city: string;
  temp: number;
  wind: number;
  condition: number; // Open-Meteo weather code
}

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  // Animated weather icons
  const icons: Record<number, JSX.Element> = {
    0: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="text-8xl"
      >
        ☀️
      </motion.div>
    ),
    1: (
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-8xl"
      >
        🌤️
      </motion.div>
    ),
    2: (
      <motion.div
        animate={{ x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="text-8xl"
      >
        ⛅
      </motion.div>
    ),
    3: (
      <motion.div
        animate={{ x: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="text-8xl"
      >
        ☁️
      </motion.div>
    ),
    61: (
      <div className="relative flex justify-center text-7xl">
        🌧️
        <motion.div
          className="absolute top-12 text-blue-300"
          animate={{ y: [0, 25], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          💧
        </motion.div>
      </div>
    ),
    71: (
      <div className="relative flex justify-center text-7xl">
        ❄️
        <motion.div
          className="absolute top-12 text-white"
          animate={{ y: [0, 25], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ❄️
        </motion.div>
      </div>
    ),
    95: (
      <motion.div
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-8xl"
      >
        ⛈️
      </motion.div>
    ),
  };

  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    61: "Rain",
    71: "Snowfall",
    95: "Thunderstorm",
  };

  const icon = icons[weather.condition] || <span className="text-8xl">❔</span>;
  const desc = descriptions[weather.condition] || "Unknown";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="mt-8 bg-white/20 backdrop-blur-xl p-8 rounded-3xl w-full max-w-3xl shadow-2xl"
    >
      {/* Responsive grid → icon left, data right */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* Left: Animated Weather Icon */}
        <div className="flex justify-center">{icon}</div>

        {/* Right: Weather Data */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{weather.city}</h2>
          <p className="text-6xl font-extrabold my-4">{weather.temp}°C</p>
          <p className="text-lg">{desc}</p>
          <p className="mt-2 text-sm opacity-80">
            💨 Windspeed: {weather.wind} km/h
          </p>
        </div>
      </div>
    </motion.div>
  );
}
