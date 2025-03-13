import { EXTERNAL_API_DOMAIN } from "@/shared/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ]
  },
  /* config options here */

};

export default nextConfig;
