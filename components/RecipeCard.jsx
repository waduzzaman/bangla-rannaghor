"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
      {/* Video or Placeholder Image */}
      <div className="w-full h-56 sm:h-64 md:h-48 lg:h-56 relative">
        {recipe.youtubeId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${recipe.youtubeId}`}
            title={recipe.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image
            src={
              recipe.image ||
              "https://placehold.co/400x250/2dd4bf/000000?text=Recipe+Photo"
            }
            alt={recipe.title}
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>

      {/* Recipe Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-teal-700 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{recipe.excerpt}</p>
        <p className="text-gray-500 text-xs font-semibold">
          {recipe.category} • ⏱ {recipe.prepTime} • 🔥 {recipe.cookTime}
        </p>
        <Link
          href={`/recipes/${recipe.slug}`}
          className="mt-3 inline-block text-teal-600 hover:text-teal-800 font-semibold text-sm"
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
}
