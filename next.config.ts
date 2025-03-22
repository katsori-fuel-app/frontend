import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    reactStrictMode: true,
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
        buildActivity: false, // Отключает индикатор активности сборки
    },
    productionBrowserSourceMaps: false, // Отключает Source Maps для браузера,
    images: {
        remotePatterns: [],
        unoptimized: true, // Разрешает использовать изображения из папки `public` без дополнительных правил
    },
};

export default nextConfig;
