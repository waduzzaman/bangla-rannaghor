// /app/layout.js
import './globals.css';

import Footer from '../components/Footer';
import Navbar from '@/components/NavBar';

// The SVG uses a viewBox of 100x100. The text element positions the emoji.
const pepperEmojiSVG = 
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <text y='.9em' font-size='90'>🌶️</text>
  </svg>`;

// We must URL-encode the SVG string to safely embed it in the data URI.
// NOTE: This encoding is often done automatically by Next.js if you use the object syntax, 
// but defining the full string works as a robust fallback.
const encodedSVG = encodeURIComponent(pepperEmojiSVG);
export const metadata = {
  title: 'BanglaRannaghor - Authentic Bangladeshi Recipes',
  description: 'Explore 55 authentic recipes from Kacchi Biryani to Shorshe Ilish.',
  icons: {
    icon: `data:image/svg+xml,${encodedSVG}`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}