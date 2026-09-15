import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Consolidate the deployed homepage alias without redirecting other paths.
      { source: "/index", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
