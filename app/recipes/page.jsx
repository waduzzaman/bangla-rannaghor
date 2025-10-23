// /app/recipes/page.js
"use client";

import React, { useState, useMemo } from "react";
import RecipeCard from "../../components/RecipeCard";
import { initialRecipes, categories } from "../../data/recipes";

export default function RecipesListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter(
      (recipe) =>
        selectedCategory === "All" || recipe.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        All Bangladeshi Recipes
      </h2>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-xl shadow-inner">
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
            {category} (
            {initialRecipes.filter((r) => r.category === category).length})
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="text-lg text-gray-600 col-span-full">
            No recipes found for this category.
          </p>
        )}
      </div>
    </div>
  );
}
