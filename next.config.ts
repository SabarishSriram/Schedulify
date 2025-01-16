import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com","avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nylas.com', 
       pathname: '/wp-content/uploads/**'
      }
    ]
  },
};

export default nextConfig;
