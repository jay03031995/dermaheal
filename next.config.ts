import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity image CDN — used everywhere content has been uploaded into the CMS.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // The legacy patient gallery still points at the live clinic site;
      // keep this allow-list entry until those images are migrated into Sanity.
      { protocol: "https", hostname: "dermaheal.co.in" },
      { protocol: "https", hostname: "www.dermaheal.co.in" },
    ],
  },
  async redirects() {
    // Canonical host: send every www.dermaheal.co.in request to the apex
    // domain (301). This only fires when the deployment actually serves the
    // www host, so it's harmless on the preview URL.
    const canonicalHost = {
      source: "/:path*",
      has: [{ type: "host" as const, value: "www.dermaheal.co.in" }],
      destination: "https://dermaheal.co.in/:path*",
      permanent: true,
    };

    // Pull URL redirects from Sanity at build time. Falls back to just the
    // canonical-host rule when Sanity isn't configured yet.
    try {
      const { sanityEnabled, client } = await import("./src/sanity/lib/client");
      if (!sanityEnabled) return [canonicalHost];
      const docs = await client.fetch<
        { from: string; to: string; permanent?: boolean }[]
      >(`*[_type == "redirect" && defined(from) && defined(to)]{from,to,permanent}`);
      return [
        canonicalHost,
        ...docs.map((d) => ({
          source: d.from,
          destination: d.to,
          permanent: d.permanent ?? true,
        })),
      ];
    } catch {
      return [canonicalHost];
    }
  },
};

export default nextConfig;
