import { EXTERNAL_API_DOMAIN } from "@/shared/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/mobile/api/:path*',
        destination: `${EXTERNAL_API_DOMAIN}/mobile/api/:path*`,
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
