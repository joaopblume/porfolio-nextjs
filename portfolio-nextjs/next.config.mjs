/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['api.placeholder.com'], // Allow placeholder images
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.placeholder.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    experimental: {
      // Enable this if you have API routes that need to handle form submissions
      serverActions: true,
    },
  }
  
export default nextConfig;
