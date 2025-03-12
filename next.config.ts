import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/',
        destination: `${process.env.EXTERNAL_API_DOMAIN}/mobile/api/`,
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
