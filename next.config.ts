import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/mobile/api/',
        destination: `/mobile/api/`,
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
