"use client";
import React, { useMemo, useState } from "react";
import MoviesCard from "./MoviesCard";

export default function SearchResults({ searchText, movies = [] }) {
  const [sortType, setSortType] = useState("");

  // Sort movies dynamically using useMemo for performance
  const filteredMovies = useMemo(() => {
    if (!sortType) return movies;

    switch (sortType) {
      case "Low-Price":
        return [...movies].sort((a, b) => a.trackPrice - b.trackPrice);
      case "High-Price":
        return [...movies].sort((a, b) => b.trackPrice - a.trackPrice);
      case "Release-Date":
        return [...movies].sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
      default:
        return movies;
    }
  }, [movies, sortType]);

  return (
    <>
      {/* Header + Sort Control */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 dark:text-white">
        <h1 className="text-2xl font-semibold">
          Search Results for <span className="text-orange-500">“{searchText}”</span>
        </h1>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="text-base px-4 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">Sort By</option>
          <option value="Low-Price">Low Price</option>
          <option value="High-Price">High Price</option>
          <option value="Release-Date">Release Date</option>
        </select>
      </div>

      {/* Results Grid */}
      <div className="px-6 pb-10">
        {filteredMovies?.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MoviesCard key={movie.trackId} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300 py-16 text-lg">
            No movies found for <span className="font-semibold">“{searchText}”</span>.
          </div>
        )}
      </div>
    </>
  );
}
