import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Pin the workspace root to this project — the home directory contains another
// package-lock.json which otherwise confuses Next's workspace inference.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
  poweredByHeader: false,
  // The site embeds a Google Maps iframe and links to remote dermaheal.co.in
  // before/after photos — keep `<img>` tags rather than next/image to avoid
  // pinning a remote-host allow-list inside this config.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
