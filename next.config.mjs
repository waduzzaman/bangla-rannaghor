/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Use remotePatterns for modern Next.js configuration
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '', // Leave blank if no port is needed
        pathname: '/**', // Allows any path on this hostname
      },
    ],
  },
};


export default nextConfig;
