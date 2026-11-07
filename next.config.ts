import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Add image host patterns here as needed, e.g. Cloudinary, Vercel Blob
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
  // Required to allow Stripe webhook raw body access
  experimental: {},
  async redirects() {
    return [{ source: "/need-talent", destination: "/needtalent", permanent: true }];
  },
};

export default nextConfig;
