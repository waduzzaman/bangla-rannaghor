"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";

export default function BlogsPage() {
  const [visibleBlogs, setVisibleBlogs] = useState(3); // show 3 blogs initially

  const handleLoadMore = () => {
    setVisibleBlogs((prev) => prev + 3); // load 3 more on each click
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-teal-700 mb-4">
          BanglaRannaghor Blog
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
          Discover stories, cooking tips, and culinary inspirations from across
          Bangladesh. Learn more about your favorite recipes, ingredients, and
          traditions.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <div className="w-full h-56 overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={400}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                unoptimized
              />
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-sm mb-2">{blog.date}</p>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-block text-teal-600 hover:text-teal-800 font-semibold transition duration-200"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleBlogs < blogs.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 transform hover:scale-105 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}

      {/* Call-to-Action */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Want to Share Your Recipe Story?
        </h2>
        <p className="text-gray-700 mb-6">
          We love hearing from food lovers! Submit your own Bangladeshi recipe
          experience or cooking tip to feature on our blog.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-amber-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-amber-600 transform hover:scale-105 transition duration-300"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
