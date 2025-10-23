import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; 
import { blogs } from "@/data/blogs";

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-12 font-poppins">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500">
        
        {/* Blog Hero Image */}
        {blog.image && (
          <div className="relative w-full aspect-[16/7] lg:aspect-[16/6]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover rounded-t-3xl"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        )}

        {/* Blog Content */}
        <div className="px-8 sm:px-16 py-12 sm:py-16">
          
          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <p className="text-sm tracking-[0.2em] uppercase text-amber-600/70 font-semibold mb-1">
              {blog.category || "Insight"}
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-snug">
              {blog.title}
            </h1>
            <p className="text-gray-500 text-sm font-light pt-2 border-t border-gray-100 mt-3">
              Published on <time dateTime={blog.date} className="text-gray-600 font-medium">{blog.date}</time>
            </p>
          </header>

          {/* Article Body */}
          <div className="
            prose 
            prose-lg 
            max-w-none 
            text-gray-700
            [&>p]:text-base 
            [&>p]:leading-6  /* compact line spacing */
            [&>p]:mb-4       /* reduced spacing between paragraphs */
            [&>p]:font-normal
            [&>h2]:text-2xl 
            [&>h2]:font-semibold
            [&>h2]:text-gray-800
            [&>h2]:mt-6
            [&>ul]:text-base 
            [&>ul]:list-disc 
            [&>li]:mb-2
            [&>p>a]:text-teal-700
            [&>p>a]:border-b
            [&>p>a]:border-teal-300/50
            [&>p>a]:hover:border-teal-700
            [&>p>a]:transition-colors
          ">
            {blog.content.split("\n").map((para, idx) => (
              para.trim() && <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Footer Navigation */}
          <footer className="mt-10 pt-4 border-t border-gray-100">
            <Link
              href="/blogs"
              className="inline-flex items-center space-x-2 text-base text-gray-600 hover:text-gray-900 font-medium tracking-wide transition duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 stroke-2 text-teal-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Back to Blogs</span>
            </Link>
          </footer>

        </div>
      </article>
    </div>
  );
}