import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Hostinger VPS (PM2 + Nginx).
  output: "standalone",

  // Pin the workspace root, otherwise Turbopack walks up and finds an unrelated
  // package-lock.json in the user's home directory.
  turbopack: { root: path.resolve(import.meta.dirname) },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
