import type { NextConfig } from "next";

/**
 * 301 redirects for the old (.html) dermatology site → equivalent new routes.
 * Slugs verified against the live CMS. Every destination resolves to a real
 * page. Sources are case-sensitive and match the exact indexed URLs.
 */
const LEGACY_REDIRECTS = [
  // --- Doctors ---
  { source: "/Dr.Navjot-Singh-Arora.html", destination: "/doctors/navjot-arora" },
  { source: "/Dr.Jasmine-Kohli.html", destination: "/doctors/jasmine-kohli" },
  { source: "/Dr.Sonika-Soni.html", destination: "/doctors/sonika-soni" },

  // --- Treatments (exact equivalent still exists) ---
  { source: "/hair-transplant.html", destination: "/treatments/hair-transplant" },
  { source: "/thread-lift.html", destination: "/treatments/thread-lifting" },
  { source: "/dermal-fillers.html", destination: "/treatments/dermal-fillers" },
  { source: "/acne-scars-reduction.html", destination: "/treatments/acne-scar-reduction" },
  { source: "/chemical-peel-service.html", destination: "/treatments/chemical-peeling" },
  { source: "/MNRF_treatment.html", destination: "/treatments/mnrf" },
  { source: "/Face_prp.html", destination: "/treatments/face-prp" },
  { source: "/Hair_prp.html", destination: "/treatments/hair-prp" },
  { source: "/carbon-laser-facial.html", destination: "/treatments/carbon-laser-facial" },
  { source: "/glutathione.html", destination: "/treatments/glutathione-skin-lightening" },
  { source: "/laser-hair-reduction.html", destination: "/treatments/laser-hair-reduction" },
  { source: "/cosmelan.html", destination: "/treatments/cosmelan" },
  { source: "/dermamelan.html", destination: "/treatments/dermamelan" },
  { source: "/exosomes.html", destination: "/treatments/exosomes" },
  { source: "/drs.html", destination: "/treatments/drs" },
  { source: "/pdrn.html", destination: "/treatments/pdrn" },
  { source: "/ipl.html", destination: "/treatments/ipl" },
  { source: "/hair-loss-service.html", destination: "/treatments/hair-loss-treatment" },
  { source: "/tattoo-removal.html", destination: "/treatments/tattoo-removal" },
  { source: "/medifacial.html", destination: "/treatments/medifacial" },
  { source: "/lipolysis.html", destination: "/treatments/lipolysis-injection" },
  { source: "/hifu.html", destination: "/treatments/hifu" },
  { source: "/Nail_surgery.html", destination: "/treatments/nail-surgery" },
  { source: "/Cyst_surgery.html", destination: "/treatments/cyst-surgery" },

  // --- Treatments removed on the new site → closest concern page ---
  { source: "/anti-wrinkle.html", destination: "/concerns/anti-ageing-wrinkles" },
  { source: "/hyperpigmentation.html", destination: "/concerns/pigmentation-melasma" },
  { source: "/vitiligo.html", destination: "/concerns/vitiligo" },

  // --- Galleries (no direct equivalent) → results ---
  { source: "/patient-gallery.html", destination: "/results" },
  { source: "/gallery.html", destination: "/results" },
  { source: "/equipment-gallery.html", destination: "/results" },

  // --- Other ---
  { source: "/testimonial.html", destination: "/#testimonials" },
  { source: "/contact.html", destination: "/#contact" },
].map((r) => ({ ...r, statusCode: 301 as const }));

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
        ...LEGACY_REDIRECTS,
        ...docs.map((d) => ({
          source: d.from,
          destination: d.to,
          permanent: d.permanent ?? true,
        })),
      ];
    } catch {
      return [canonicalHost, ...LEGACY_REDIRECTS];
    }
  },
};

export default nextConfig;
