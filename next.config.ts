import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: false,
    devIndicators: {
        position: "top-left",
    },
    productionBrowserSourceMaps: false,
    images: {
        remotePatterns: [],
        unoptimized: true,
    },
};

export default nextConfig;
