import type { Metadata } from "next";
import type { TreatmentDetailFetched } from "@/sanity/lib/fetchers";
import { absoluteUrl, normalizeAssetUrl, OG_IMAGE } from "@/lib/seo";

function localizedTitleFor(treatment: TreatmentDetailFetched) {
  const customTitle = treatment.seo?.title
    ?.trim()
    .replace(/\s*\|\s*Dermaheal.*$/i, "");
  const fallbackTitle = `${treatment.name} in Dwarka, Delhi`;
  const titleCore =
    customTitle && /\bdwarka\b/i.test(customTitle)
      ? customTitle
      : fallbackTitle;
  return /\bdelhi\b/i.test(titleCore)
    ? titleCore
    : `${titleCore}, Delhi`;
}

export function treatmentHeading(treatment: TreatmentDetailFetched) {
  return localizedTitleFor(treatment);
}

function descriptionFor(treatment: TreatmentDetailFetched) {
  const prefix = `${treatment.name} at Dermaheal, Sector 7 Dwarka. `;
  const availableLength = 155 - prefix.length;
  const overview = treatment.overview.trim();
  if (!overview) {
    return `Discuss ${treatment.name.toLowerCase()} with a dermatologist at Dermaheal, Sector 7, Dwarka, New Delhi.`;
  }
  const truncated = overview.length > availableLength
    ? `${overview.slice(0, availableLength - 1).replace(/\s+\S*$/, "")}…`
    : overview;

  return `${prefix}${truncated}`;
}

export function treatmentMetadata(
  treatment: TreatmentDetailFetched,
): Metadata {
  const socialTitle = `${localizedTitleFor(treatment)} | Dermaheal`;
  const description =
    treatment.seo?.description?.trim() ||
    descriptionFor(treatment);
  const canonical =
    treatment.seo?.canonicalUrl?.trim() ||
    `/treatments/${treatment.slug}`;
  const socialImage =
    normalizeAssetUrl(treatment.seo?.ogImageUrl) ?? OG_IMAGE.url;
  const image = socialImage.startsWith("http")
    ? socialImage
    : absoluteUrl(socialImage);

  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical },
    ...(treatment.seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: absoluteUrl(canonical),
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
