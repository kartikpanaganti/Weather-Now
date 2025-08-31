import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/Searchbar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";

// define what weather data looks like
interface WeatherData {
  city: string;
  temp: number;
  wind: number;
  condition: number; // Open-Meteo weathercode
}

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch weather
  const fetchWeather = async (city: string) => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // Step 1: Geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("🌍 City not found.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Weather API
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: `${name}, ${country}`,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        condition: weatherData.current_weather.weathercode,
      });
    } catch (err) {
      setError("⚠️ Failed to fetch weather. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold mb-8 drop-shadow-lg"
      >
        🌤️ Weather Now
      </motion.h1>

      <SearchBar onSearch={fetchWeather} loading={loading} />

      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}

      {/* Footer */}
      <Footer />
    </div>
  );
}
