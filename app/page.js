"use client";
import PaginationControl from "./component/PaginationControl";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  // Fetch suggestions (debounced)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(
            search
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
  }, [search]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/movies/search?query=${encodeURIComponent(search.trim())}`);
      setSuggestions([]); // close dropdown
    }
  };

  const handleSuggestionClick = (movie) => {
    router.push(`/movies/${movie.trackId}`);
    setSearch("");
    setSuggestions([]);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[22rem] sm:h-[26rem] lg:h-[32rem]">
        <img
          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Movies background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Centered Search Form + Suggestions */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="relative w-[90%] sm:w-[70%] md:w-[50%] max-w-xl" ref={wrapperRef}>
            <form
              onSubmit={handleSubmit}
              className="flex w-full"
            >
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsTyping(true);
                }}
                placeholder="Search for movies..."
                aria-label="Search for movies"
                className="flex-1 px-4 sm:px-6 py-3 rounded-l-full bg-gray-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-3 rounded-r-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center transition-colors"
              >
                <FaSearch />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {isTyping && suggestions.length > 0 && (
              <ul className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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

            {/* No results */}
            {isTyping && search.trim() !== "" && suggestions.length === 0 && (
              <ul className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <li className="p-3 text-gray-500 dark:text-gray-400">
                  No results found
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="mt-8">
        <PaginationControl />
      </div>
    </div>
  );
}
