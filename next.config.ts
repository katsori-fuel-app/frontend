import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      resolveAlias: {
        feature: path.resolve(__dirname, "src/feature"),
        shared: path.resolve(__dirname, "src/shared"),
        styles: path.resolve(__dirname, "src/styles"),
      },
    },
  },
};

export default nextConfig;
