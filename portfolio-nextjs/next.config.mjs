/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'], // Permitir imagens de serviços de placeholder
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Configuração correta de serverActions como objeto, não booleano
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app'],
    },
  },
  // Ignorar completamente erros de ESLint durante a build
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;