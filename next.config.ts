import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Self-contained server bundle for the Hostinger VPS (PM2 + Nginx).
   *
   * Skipped on Vercel, which builds with its own output pipeline — forcing
   * "standalone" there reshapes the build output and the deployment can 404.
   * Vercel sets VERCEL=1 on every build, so this needs no configuration.
   */
  output: process.env.VERCEL ? undefined : "standalone",

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
