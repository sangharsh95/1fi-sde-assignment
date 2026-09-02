import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/**/*": ["./dev.db", "./prisma/dev.db"],
  },
};

export default nextConfig;
