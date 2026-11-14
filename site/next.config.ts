import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [440, 828, 1320, 1920, 2560, 3840, 5120] },
  async headers() {
    return [
      { source: "/seq/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/labels/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};
export default config;
