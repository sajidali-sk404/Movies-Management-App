"use client";
import { useState, useEffect } from "react";
import { PaginationMovies } from "./api/Request";
import MoviesCard from "./MoviesCard";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const PaginationControl = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      setError("");
      const results = await PaginationMovies(page);
      setMovies(results || []);
    } catch (err) {
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <>
      {/* Movie Grid */}
      <div className="m-5 mt-16">
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium py-10">
            {error}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {movies.map((movie) => (
              <MoviesCard key={movie.trackId} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300 py-10">
            No movies found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 p-6 bg-slate-100 dark:bg-slate-700">
        <button
          onClick={handlePrevPage}
          disabled={page === 1 || loading}
          className={`flex items-center gap-1 px-4 py-2 rounded-full border transition-colors ${
            page === 1 || loading
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <GrFormPrevious size={20} /> Prev
        </button>

        <span className="font-semibold text-gray-700 dark:text-gray-200">
          Page {page}
        </span>

        <button
          onClick={handleNextPage}
          disabled={loading}
          className="flex items-center gap-1 px-4 py-2 rounded-full border bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Next <GrFormNext size={20} />
        </button>
      </div>
    </>
  );
};

export default PaginationControl;
