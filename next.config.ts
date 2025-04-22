import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    reactStrictMode: false,
    experimental: {
        turbo: {
            resolveAlias: {
                feature: path.resolve(__dirname, 'src/feature'),
                shared: path.resolve(__dirname, 'src/shared'),
                styles: path.resolve(__dirname, 'src/styles'),
            },
        },
    },
    devIndicators: {
        buildActivity: false,
    },
    productionBrowserSourceMaps: false,
    images: {
        remotePatterns: [],
        unoptimized: true,
    },
};

export default nextConfig;
