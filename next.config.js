/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 静的エクスポートでのhydration問題を回避
  swcMinify: true,
  
  // 静的エクスポート設定
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  experimental: {
    // scrollRestoration: true, // 静的エクスポート時は無効化
    esmExternals: false,
  },
  
  
  // 静的ホスティング用の設定 
  assetPrefix: process.env.NODE_ENV === 'production' ? '/test/wareki_convert' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/test/wareki_convert' : '',
  
  // ビルド最適化
  compress: true,
  poweredByHeader: false,
  
  // 静的ファイル設定（静的エクスポート時はコメントアウト）
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       {
  //         source: '/sw.js',
  //         destination: '/sw.js',
  //       },
  //       {
  //         source: '/manifest.json',
  //         destination: '/manifest.json',
  //       },
  //     ],
  //   }
  // },

  // 画像最適化設定（静的ホスティング用）
  images: {
    unoptimized: true,
    domains: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Webpack 最適化
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // バンドルサイズ最適化（静的ホスティング用）
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // React と Material-UI を別チャンクに
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 20,
            enforce: true,
          },
          mui: {
            name: 'mui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            priority: 15,
            enforce: true,
          },
          // その他のベンダー
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            enforce: true,
          },
        },
      };
    }

    return config;
  },
}

module.exports = nextConfig