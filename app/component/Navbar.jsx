import Link from "next/link";
import TogleThem from "./TogleThem";

export default function Navbar() {
  return (
    <nav
      role="navigation"
      className="bg-gray-900 text-white shadow-md"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="text-3xl font-extrabold tracking-wide hover:text-gray-300 transition-colors duration-200 sm:text-2xl"
        >
          🎬 MovieNest
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/watchlist"
            className="px-5 py-2 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors duration-200 text-sm sm:text-base"
          >
            Watchlist
          </Link>

          {/* Theme Toggle */}
          <TogleThem />
        </div>
      </div>
    </nav>
  );
}
