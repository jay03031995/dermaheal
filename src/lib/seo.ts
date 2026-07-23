import type { Metadata } from "next";
import { CLINIC } from "@/data/clinic";

export const SITE_URL = "https://www.dermaheal.co.in";

export const SITE_NAME = CLINIC.name;

export const DEFAULT_TITLE =
  "Dermaheal Skin & Hair Clinic - Top Dermatologist in Dwarka, Delhi";

export const DEFAULT_DESCRIPTION =
  "Dermaheal is Dwarka's trusted skin and hair clinic. 27+ advanced treatments including hair transplant, Botox, MNRF, Cosmelan and laser hair reduction, calibrated for Indian skin.";

export const OG_IMAGE = {
  url: "/og-image.png",
  secureUrl: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Dermaheal Skin & Hair Clinic logo",
  type: "image/png",
};

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function normalizeAssetUrl(url?: string) {
  return url?.replace(
    /^https:\/\/dermaheal\.co\.in(?=\/)/,
    "https://www.dermaheal.co.in",
  );
}

export function pageMetadata({
  title,
  description,
  canonical,
}: {
  title: string;
  description: string;
  canonical: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.secureUrl],
    },
  };
}
