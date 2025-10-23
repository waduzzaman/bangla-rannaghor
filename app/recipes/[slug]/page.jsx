// /app/recipes/[slug]/page.js (SERVER COMPONENT)
import React from 'react';
import { notFound } from 'next/navigation';
import { initialRecipes } from '@/data/recipes'; // Ensure the path is correct
import Link from 'next/link';
import Image from 'next/image';

// --- Static Generation Functions ---

// Generate static params at build time
export async function generateStaticParams() {
  return initialRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

// Generate page metadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const recipe = initialRecipes.find(r => r.slug === resolvedParams.slug);
  if (!recipe) notFound();
  return { title: recipe.title };
}


// --- Main Page Component ---
export default async function RecipeDetailPage({ params }) {
  // Await params in Server Component
  const resolvedParams = await params;

  const recipe = initialRecipes.find((r) => r.slug === resolvedParams.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-xl">
      <h1 className="text-5xl font-extrabold text-teal-700 mb-4">{recipe.title}</h1>
      <p className="text-xl text-gray-600 mb-6 italic">{recipe.excerpt}</p>

      <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-700 mb-8 border-b pb-4">
        <span className="bg-teal-100 px-3 py-1 rounded-full">{recipe.category}</span>
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          <span role="img" aria-label="prep time">⏱</span> Prep: {recipe.prepTime}
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          <span role="img" aria-label="cook time">🔥</span> Cook: {recipe.cookTime}
        </span>
      </div>

     <Image
  src={recipe.image || "https://placehold.co/800x400/2dd4bf/000000?text=Recipe+Photo"}
  alt={recipe.title}
  width={800}
  height={400}
  className="w-full h-96 object-cover rounded-lg shadow-md mb-8"
    unoptimized // ⚠️ allow external SVG
/>

      {/* Ingredients */}
      <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b-2 border-amber-500 pb-1">Ingredients</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-8 columns-1 sm:columns-2">
        {recipe.ingredients.map((item, index) => (
          <li key={index} className="pl-1">{item}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-amber-500 pb-1">Instructions</h2>
      <ol className="list-decimal list-inside text-lg text-gray-700 space-y-4">
        {recipe.instructions.map((step, index) => (
          <li key={index} className="font-medium">
            <span className="font-normal">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 text-center">
        <Link href="/recipes" className="text-teal-600 hover:text-teal-800 font-semibold text-lg transition duration-200">
          ← Back to All Recipes
        </Link>
      </div>
    </div>
  );
}
