"use client";
import React, { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function TogleThem() {
  const [DarkMode, setDarkMode] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // If user already picked a theme, use it
      setDarkMode(savedTheme === "dark");
    } else {
      // Otherwise, use system/browser preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply theme whenever DarkMode changes
  useEffect(() => {
    if (DarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [DarkMode]);

  const handleDarkMode = () => {
    setDarkMode(!DarkMode);
  };

  return (
    <div>
      <button
        className="text-white p-2 border-2 rounded-full"
        onClick={handleDarkMode}
      >
        {DarkMode ? <IoSunny /> : <IoMoon />}
      </button>
    </div>
  );
}
