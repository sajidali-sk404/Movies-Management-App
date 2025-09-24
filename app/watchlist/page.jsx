"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegBookmark } from "react-icons/fa6";

const MovieList = ({ movies }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load the watchlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlist(saved);
    } catch (err) {
      console.error("Error reading watchlist:", err);
    }
  }, []);



   
  // Add or remove toggle
  const toggleWatchlist = (movie) => {
    if (watchlist.some((item) => item.trackId === movie.trackId)) {
      // Remove movie
      setWatchlist((prev) =>
        prev.filter((item) => item.trackId !== movie.trackId)
      );
    } else {
      // Add movie
      setWatchlist((prev) => [...prev, movie]);
    }
  };

    // const removeFromWatchlist = (movie) => {
    //     const updatedWatchlist = watchlist.filter((item) => item.trackId !== movie.trackId);
    //     setWatchlist(updatedWatchlist);
    //     localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist)); // Save to localStorage
    // };


  return (
    <div className="p-4">
      {/* Movies List */}
      <h2 className="text-2xl font-bold mb-4">Movies</h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-500">No movies found.</p>
      ) : (
        <ul className="grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-6">
          {movies?.map((movie) => {
            const inWatchlist = watchlist.some(
              (item) => item.trackId === movie.trackId
            );
            return (
              <li
                key={movie.trackId}
                className="border rounded-lg p-3 hover:shadow-lg transition"
              >
                <Link href={`/movies/${movie.trackId}`}>
                  <img
                    className="w-full rounded-md mb-2"
                    src={movie.artworkUrl100}
                    alt={movie.trackName}
                  />
                  <h3 className="font-bold text-sm">{movie.trackName}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Actor: {movie.artistName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Price: {movie.trackPrice}
                  </p>
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                    {movie.primaryGenreName}
                  </span>
                </Link>

                <button
                  onClick={() => toggleWatchlist(movie)}
                  className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white ${
                    inWatchlist
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  <FaRegBookmark />
                  {inWatchlist ? "Remove" : "Add"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Watchlist */}
      {watchlist.length === 0 ? (
        <p className="text-center text-red-600 font-medium">
          No movies in your watchlist.
        </p>
      ) : (
        <ul className="grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-6">
          {watchlist.map((movie) => (
            <li
              key={movie.trackId}
              className="border rounded-lg p-3 hover:shadow-lg transition"
            >
              <Link href={`/movies/${movie.trackId}`}>
                <img
                  className="w-full rounded-md mb-2"
                  src={movie.artworkUrl100}
                  alt={movie.trackName}
                />
                <h3 className="font-bold text-sm">{movie.trackName}</h3>
              </Link>
              <button
                onClick={() => toggleWatchlist(movie)}
                className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
              >
                <FaRegBookmark />
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
