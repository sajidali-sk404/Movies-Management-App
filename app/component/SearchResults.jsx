"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SearchMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  // Fetch suggestions (debounced)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(
            searchQuery
          )}&media=movie&limit=5`
        );
        const data = await response.json();
        setSuggestions(data.results || []);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  };

  const handleSuggestionClick = (movie) => {
    router.push(`/movies/${movie.trackId}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/movies/search?query=${searchQuery}`);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative max-w-xl w-full" ref={wrapperRef}>
      {/* Input Field */}
      <form onSubmit={handleSubmit} className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 px-3">
        <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search movies by title..."
          value={searchQuery}
          onChange={handleChange}
          className="p-2 w-full bg-transparent focus:outline-none dark:text-white"
        />
      </form>

      {/* Suggestions Dropdown */}
      {isTyping && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeIn">
          {suggestions.map((movie) => (
            <li
              key={movie.trackId}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => handleSuggestionClick(movie)}
            >
              <span className="font-semibold">{movie.trackName}</span>{" "}
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {movie.primaryGenreName}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* No results message */}
      {isTyping && searchQuery.trim() !== "" && suggestions.length === 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <li className="p-3 text-gray-500 dark:text-gray-400">
            No results found
          </li>
        </ul>
      )}
    </div>
  );
}
