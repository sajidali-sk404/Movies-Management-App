"use client";
import PaginationControl from "./component/PaginationControl";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/movies/search?query=${encodeURIComponent(search.trim())}`);
    }
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

        {/* Centered Search Form */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <form
            onSubmit={handleSubmit}
            className="flex w-[90%] sm:w-[70%] md:w-[50%] max-w-xl"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        </div>
      </div>

      {/* Pagination Section */}
      <div className="mt-8">
        <PaginationControl />
      </div>
    </div>
  );
}
