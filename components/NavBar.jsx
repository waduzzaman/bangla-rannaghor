// /components/Navbar.jsx
"use client";

import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-teal-600 shadow-xl sticky top-0 z-50">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-3xl font-bold text-white cursor-pointer hover:text-teal-200 transition duration-150">
        বাংলা রান্নাঘর 🌶️
      </Link>
      <div className="space-x-6 text-lg">
        <Link href="/recipes" className="text-white hover:text-teal-200 transition duration-150 font-medium">
          Recipes
        </Link>
        {/* Simple static link for About - create an /app/about/page.js if needed */}
        <Link href="/about" className="text-white hover:text-teal-200 transition duration-150 font-medium hidden sm:inline">
          About
        </Link>
        <Link href="/blogs" className="text-white hover:text-teal-200 transition duration-150 font-medium hidden sm:inline">
          Blogs
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;