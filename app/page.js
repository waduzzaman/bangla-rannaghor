// /app/page.js
import React from 'react';
import Link from 'next/link';
// 👇 FIX: Use curly braces to import the named export 'initialRecipes'
import { initialRecipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

// Hero Section (moved here for simplicity)
const Hero = () => (
  <div className="bg-gray-100 rounded-xl p-8 sm:p-16 text-center shadow-lg mb-12">
    <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
      Explore the Flavors of **Bangladesh**
    </h2>
    <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
      55 authentic recipes from **Kacchi Biryani** to **Shorshe Ilish**.
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
  // Line 27: initialRecipes is now correctly an array, so .slice() works.
  const featuredRecipes = initialRecipes.slice(0, 3);
  
  return (
    <>
      <Hero />
      <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-teal-500 inline-block pb-1">
        Featured Recipes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}