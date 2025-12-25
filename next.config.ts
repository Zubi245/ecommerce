import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  env: {
    GEMINI_API_KEY: "PLACEHOLDER_API_KEY",
    MONGO_URI: "mongodb + srv://zubairanwar245_db_user:dKB52OQEFvyQvEK5@cluster0.h7jabyi.mongodb.net/samfabrics",

    IMAGEKIT_PUBLIC_KEY: "public_C+eb90mUDk9SaKV/4otCfze+N+g=",
    IMAGEKIT_PRIVATE_KEY: "private_vXrOlOMEjxCuucJvyTPoidmZZMw=",
    IMAGEKIT_URL_ENDPOINT: "https://ik.imagekit.io/samfabrics"
  }
};

export default nextConfig;
