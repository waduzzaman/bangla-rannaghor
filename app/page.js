"use client"; // Required for useState and useMemo

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { initialRecipes, categories } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

// Hero Section
const Hero = () => (
  <div className="bg-gray-100 rounded-xl p-8 sm:p-16 text-center shadow-lg mb-12">
    <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
      Explore the Flavors of <span className="text-teal-600">Bangladesh</span>
    </h2>
    <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
      55 authentic recipes from <strong>Kacchi Biryani</strong> to <strong>Shorshe Ilish</strong>.
    </p>
    <Link 
      href="/recipes" 
      className="inline-block bg-amber-500 text-white text-xl font-bold px-8 py-3 rounded-full shadow-lg hover:bg-amber-600 transform hover:scale-105 transition duration-300"
    >
      Start Cooking Now!
    </Link>
  </div>
);

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter recipes by search term and category
  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter((recipe) => {
      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  // Featured recipes (top 3)
  const featuredRecipes = filteredRecipes.slice(0, 3);

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      <Hero />

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full shadow-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400 text-gray-900 transition duration-200"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-xl shadow-inner justify-center">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            selectedCategory === "All"
              ? "bg-teal-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-teal-100"
          }`}
        >
          All ({initialRecipes.length})
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedCategory === category
                ? "bg-teal-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-teal-100"
            }`}
          >
            {category} ({initialRecipes.filter((r) => r.category === category).length})
          </button>
        ))}
      </div>

      {/* Featured Recipes */}
      <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-teal-500 inline-block pb-1">
        Featured Recipes
      </h3>
      {featuredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600 col-span-full mb-12 text-center">
          No recipes found.
        </p>
      )}

      {/* All Recipes Grid */}
      <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-teal-500 inline-block pb-1">
        All Recipes
      </h3>
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600 col-span-full text-center">
          No recipes found for your search.
        </p>
      )}
    </div>
  );
}
