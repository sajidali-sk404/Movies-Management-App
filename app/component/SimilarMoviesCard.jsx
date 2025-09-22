import React from "react";
import Link from "next/link";

export default function SimilarMoviesCard({ movie }) {
  
  return (
    <>
    <li className="w-40 sm:w-48 flex-shrink-0">
      <Link
        href={`/movies/${movie.trackId}`}
        className="block bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Poster */}
        <img
          src={movie.artworkUrl100}
          alt={movie.trackName}
          className="w-full h-56 object-cover"
        />

        {/* Info */}
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{movie.trackName}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {movie.primaryGenreName}
          </p>
        </div>
      </Link>
    </li>
    </>
  );
}
