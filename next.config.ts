import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'ichzbuoylchzlqqzbvmt.supabase.co',
        // pathname: '/storage/v1/object/public/udemy-next-blog-bucket/**',
      },
    ],
  },
  experimental: {
  serverActions: {
  bodySizeLimit: '5mb', // 必要に応じて値を変更
    },
  },
};

export default nextConfig;
