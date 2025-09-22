"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";

export default function MoviesCard({ movie }) {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlist(savedWatchlist);
    }
  }, []);

  // Toggle add/remove
  const toggleWatchlist = (movie) => {
    let updatedWatchlist;

    if (watchlist.some((item) => item.trackId === movie.trackId)) {
      updatedWatchlist = watchlist.filter((item) => item.trackId !== movie.trackId);
    } else {
      updatedWatchlist = [...watchlist, movie];
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const isInWatchlist = watchlist.some((item) => item.trackId === movie.trackId);

  return (
    <div className="group border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 dark:text-white p-4 flex flex-col items-center bg-white dark:bg-gray-900">
      <Link href={`/movies/${movie.trackId}`} className="w-full">
        <img
          src={movie.artworkUrl100}
          alt={movie.trackName}
          className="w-full h-52 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
        />

        <div className="space-y-1">
          <h3 className="text-lg font-semibold line-clamp-1">{movie.trackName}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Actor:</span> {movie.artistName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Price:</span> ${movie.trackPrice}
          </p>
          <span className="inline-block text-xs mt-1 px-2 py-1 rounded bg-gray-200 dark:bg-gray-800">
            {movie.primaryGenreName}
          </span>
        </div>
      </Link>

      {/* Watchlist Button */}
      <button
        onClick={() => toggleWatchlist(movie)}
        className={`mt-4 flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-colors duration-200 ${
          isInWatchlist
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-orange-500 hover:bg-orange-600 text-white"
        }`}
      >
        <FaRegBookmark />
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
}
