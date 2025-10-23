/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow loading external images from placehold.co
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '', // leave blank
        pathname: '/**', // allow any path
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['http://localhost:3000'], // Add your dev origin here
  },
};

export default nextConfig;
