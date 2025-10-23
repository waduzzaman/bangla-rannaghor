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
};

export default nextConfig;
