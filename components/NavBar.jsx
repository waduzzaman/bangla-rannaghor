"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  // Generate breadcrumb based on current path
  const generateBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean); // remove empty segments
    return ["Home", ...segments.map(s => s.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()))];
  };

  const breadcrumb = generateBreadcrumb();

  return (
    <nav className="bg-teal-600 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold text-white cursor-pointer hover:text-teal-200 transition duration-150"
        >
          বাংলা রান্নাঘর 🌶️
        </Link>

        {/* Desktop Menu */}
        <div className="space-x-6 text-lg hidden sm:flex">
          <Link
            href="/recipes"
            className="text-white hover:text-teal-200 transition duration-150 font-medium"
          >
            Recipes
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-teal-200 transition duration-150 font-medium"
          >
            About
          </Link>
          <Link
            href="/blogs"
            className="text-white hover:text-teal-200 transition duration-150 font-medium"
          >
            Blogs
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-teal-700 text-white px-4 py-4 space-y-3">
          <Link
            href="/recipes"
            className="block hover:text-teal-200 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Recipes
          </Link>
          <Link
            href="/about"
            className="block hover:text-teal-200 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            href="/blogs"
            className="block hover:text-teal-200 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Blogs
          </Link>

          {/* Breadcrumb */}
          <div className="mt-4 bg-teal-600/20 text-white px-3 py-2 rounded text-sm">
            {breadcrumb.join(" > ")}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
