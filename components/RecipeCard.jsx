// /components/RecipeCard.jsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RecipeCard = ({ recipe }) => (
  <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 bg-white transform hover:-translate-y-1">
    <div className="relative h-48">
      <Image // <--- Change to <Image> if it was <img> before, and add the prop
      src={recipe.image}
      alt={recipe.title}
      width={400} // Required for <Image>
      height={250} // Required for <Image>
      className="w-full h-48 object-cover group-hover:scale-[1.03] transition duration-500"
      unoptimized={true} // <--- FIX: Add this property
    />
      <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
        {recipe.category}
      </span>
    </div>
    <div className="p-5">
      <Link href={`/recipes/${recipe.slug}`} className="font-bold text-xl mb-2 text-gray-900 hover:text-teal-600 transition cursor-pointer">
        {recipe.title}
      </Link>
      <p className="text-gray-700 text-base mb-4">
        {recipe.excerpt}
      </p>
      <div className="flex space-x-4 text-sm text-gray-600 border-t pt-3">
        <span><span role="img" aria-label="prep time">⏱</span> {recipe.prepTime}</span>
        <span><span role="img" aria-label="cook time">🔥</span> {recipe.cookTime}</span>
      </div>
    </div>
    <div className="px-5 pb-5">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="block text-center w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition duration-200 shadow-md"
      >
        View Recipe →
      </Link>
    </div>
  </div>
);

export default RecipeCard;