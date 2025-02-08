import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nylas.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors in production
  },
};

export default nextConfig;
