// /app/layout.js
import './globals.css';

import Footer from '../components/Footer';
import Navbar from '@/components/NavBar';

export const metadata = {
  title: 'BanglaRannaghor - Authentic Bangladeshi Recipes',
  description: 'Explore 55 authentic recipes from Kacchi Biryani to Shorshe Ilish.',
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