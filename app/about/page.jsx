// /app/about/page.js
import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-teal-700 mb-4">
          About BanglaRannaghor
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
          Discover the rich flavors of Bangladesh with our curated collection of authentic recipes. From traditional dishes like <strong>Kacchi Biryani</strong> to beloved fish recipes like <strong>Shorshe Ilish</strong>, we bring the taste of Bangladeshi kitchens to your home.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-amber-500 inline-block pb-1">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At BanglaRannaghor, our mission is to make cooking authentic Bangladeshi dishes simple and enjoyable for everyone. Whether you are a beginner or a seasoned home chef, our easy-to-follow recipes, instructional videos, and tips help you recreate traditional flavors in your own kitchen.
        </p>
      </div>

      {/* Vision Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-amber-500 inline-block pb-1">
          Our Vision
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We aim to preserve and share the culinary heritage of Bangladesh with the world. Through our platform, we connect food lovers to traditional recipes while inspiring creativity, experimentation, and a deeper appreciation for Bangladeshi cuisine.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Start Cooking Today!</h2>
        <p className="text-gray-700 mb-6">Explore our collection of over 50 authentic Bangladeshi recipes and bring your kitchen to life.</p>
        <Link
          href="/recipes"
          className="inline-block bg-teal-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-teal-700 transform hover:scale-105 transition duration-300"
        >
          Browse Recipes
        </Link>
      </div>
    </div>
  );
}
