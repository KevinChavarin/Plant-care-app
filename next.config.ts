import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Disable static generation for API routes during build
  trailingSlash: false,
  // Skip build-time errors for dynamic routes
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Ensure API routes are not pre-rendered
  generateStaticParams: false,
};

export default nextConfig;
