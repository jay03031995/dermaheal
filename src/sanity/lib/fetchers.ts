/**
 * High-level data fetchers used by page components.
 *
 * Each function tries Sanity first when the project is configured, and
 * falls back to the local TypeScript data files when Sanity is missing
 * or empty. This keeps the site fully working before / during the CMS
 * migration.
 */

import { client, sanityEnabled } from "./client";
import {
  announcementQuery,
  clinicSettingsQuery,
  concernBySlugQuery,
  concernSlugsQuery,
  concernsQuery,
  doctorBySlugQuery,
  doctorSlugsQuery,
  doctorsQuery,
  eeatPillarsQuery,
  homepageFaqsQuery,
  resultsQuery,
  siteSettingsQuery,
  testimonialsQuery,
  treatmentBySlugQuery,
  treatmentCardsQuery,
  treatmentCategoriesQuery,
  treatmentSlugsQuery,
  trustItemsQuery,
} from "./queries";

// ----- Local fallbacks ------------------------------------------------------

import { CLINIC as LOCAL_CLINIC } from "@/data/clinic";
import {
  CATEGORIES as LOCAL_CATEGORIES,
  TREATMENTS as LOCAL_TREATMENTS,
  TREATMENTS_FULL as LOCAL_TREATMENTS_FULL,
  TREATMENT_DETAIL_SLUGS as LOCAL_TREATMENT_SLUGS,
  TREATMENT_SLUGS,
  type Treatment,
  type TreatmentDetail,
  type Category,
} from "@/data/treatments";
import {
  CONCERNS_FULL as LOCAL_CONCERNS_FULL,
  CONCERN_SLUGS as LOCAL_CONCERN_SLUGS,
  type ConcernDetail,
} from "@/data/concerns";
import {
  DOCTORS as LOCAL_DOCTORS,
  DOCTOR_SLUGS as LOCAL_DOCTOR_SLUGS,
  type Doctor,
} from "@/data/doctors";
import {
  EEAT as LOCAL_EEAT,
  FAQS as LOCAL_FAQS,
  RESULTS as LOCAL_RESULTS,
  TESTIMONIALS as LOCAL_TESTIMONIALS,
  TRUST_ITEMS as LOCAL_TRUST_ITEMS,
  type Result,
} from "@/data/site";

// ----- Shared helpers -------------------------------------------------------

function isFilled<T>(v: T | null | undefined): v is T {
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.length > 0;
  return true;
}

/**
 * Tag every Sanity fetch with "sanity" so the on-demand revalidation
 * webhook (`/api/revalidate`) can invalidate all of them at once when an
 * editor publishes in Studio.
 *
 * `revalidate: 60` is a safety net: even without the webhook, pages refresh
 * at most every 60 seconds.
 */
async function safeFetch<T>(query: string, params?: Record<string, unknown>) {
  if (!sanityEnabled) return null;
  try {
    return await client.fetch<T>(query, params ?? {}, {
      next: { tags: ["sanity"], revalidate: 60 },
    });
  } catch (e) {
    console.warn("[sanity] fetch failed, falling back to local data:", e);
    return null;
  }
}

// ----- Treatments -----------------------------------------------------------

type SanityTreatmentCard = {
  _id: string;
  name: string;
  slug: string;
  category?: { key: string; title?: string };
  imageVariant?: string;
  thumbnail?: { url?: string };
  shortDescription?: string;
  duration?: string;
  tag?: string;
};

function mapTreatmentCard(d: SanityTreatmentCard, fallbackId: string): Treatment & { slug: string; imageUrl?: string } {
  return {
    id: d._id || fallbackId,
    name: d.name,
    cat: d.category?.key ?? "",
    desc: d.shortDescription ?? "",
    dur: d.duration ?? "",
    img: d.imageVariant ?? "v1",
    tag: d.tag,
    slug: d.slug,
    imageUrl: d.thumbnail?.url,
  };
}

export type TreatmentCard = Treatment & { slug: string; imageUrl?: string };

export async function getTreatmentCards(): Promise<TreatmentCard[]> {
  const docs = await safeFetch<SanityTreatmentCard[]>(treatmentCardsQuery);
  if (!isFilled(docs)) {
    return LOCAL_TREATMENTS.map((t) => ({
      ...t,
      slug: TREATMENT_SLUGS[t.id],
    }));
  }
  return docs.map((d, i) => mapTreatmentCard(d, `t${String(i + 1).padStart(2, "0")}`));
}

type SanityTreatmentDetail = SanityTreatmentCard & {
  headline?: string;
  overview?: string;
  quickDuration?: string;
  quickSessions?: string;
  quickDowntime?: string;
  keyPoints?: string[];
  suitableFor?: string[];
  process?: { title: string; description: string }[];
  benefits?: { icon: string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  heroImage?: { url?: string };
};

export type TreatmentDetailFetched = TreatmentDetail & { imageUrl?: string };

export async function getTreatmentDetailFetched(
  slug: string,
): Promise<TreatmentDetailFetched | undefined> {
  const doc = await safeFetch<SanityTreatmentDetail | null>(treatmentBySlugQuery, { slug });
  if (doc) {
    return {
      slug: doc.slug,
      name: doc.name,
      cat: doc.category?.title ?? doc.category?.key ?? "",
      img: doc.imageVariant ?? "v1",
      headline: doc.headline ?? "",
      overview: doc.overview ?? "",
      quick: {
        duration: doc.quickDuration ?? "",
        sessions: doc.quickSessions ?? "",
        downtime: doc.quickDowntime ?? "",
      },
      keyPoints: doc.keyPoints ?? [],
      suitableFor: doc.suitableFor ?? [],
      process: (doc.process ?? []).map((s) => ({ t: s.title, d: s.description })),
      benefits: (doc.benefits ?? []).map((b) => ({ i: b.icon, t: b.title, d: b.description })),
      faqs: (doc.faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
      imageUrl: doc.heroImage?.url,
    };
  }
  const local = LOCAL_TREATMENTS_FULL[slug];
  return local;
}

export async function getTreatmentSlugs(): Promise<string[]> {
  const slugs = await safeFetch<string[]>(treatmentSlugsQuery);
  if (isFilled(slugs)) return slugs;
  return LOCAL_TREATMENT_SLUGS;
}

export async function getTreatmentCategories(): Promise<Category[]> {
  const docs = await safeFetch<{ key: string; title: string; description?: string }[]>(
    treatmentCategoriesQuery,
  );
  if (!isFilled(docs)) return LOCAL_CATEGORIES;
  return docs.map((c) => ({ key: c.key, title: c.title, desc: c.description ?? "" }));
}

// ----- Concerns -------------------------------------------------------------

type SanityConcernCard = {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  cardTagline?: string;
  imageVariant?: string;
};

type SanityConcernDetail = SanityConcernCard & {
  headline?: string;
  summary?: string;
  symptoms?: string[];
  causes?: string[];
  approach?: string[];
  image?: { url?: string };
  treatments?: SanityTreatmentCard[];
  faqs?: { question: string; answer: string }[];
};

export type ConcernDetailFetched = ConcernDetail & {
  imageUrl?: string;
  treatmentCards?: TreatmentCard[];
};

export async function getConcerns(): Promise<ConcernDetail[]> {
  const docs = await safeFetch<SanityConcernCard[]>(concernsQuery);
  if (!isFilled(docs)) return LOCAL_CONCERNS_FULL;
  // Sanity concern listings only carry the card-level fields; pages that need
  // the full detail call getConcernBySlug.
  return docs.map((d) => ({
    id: d._id,
    slug: d.slug,
    name: d.name,
    icon: d.icon ?? "◍",
    count: d.cardTagline ?? "",
    headline: "",
    summary: "",
    symptoms: [],
    causes: [],
    approach: [],
    treatmentSlugs: [],
    faqs: [],
  }));
}

export async function getConcernSlugs(): Promise<string[]> {
  const slugs = await safeFetch<string[]>(concernSlugsQuery);
  if (isFilled(slugs)) return slugs;
  return LOCAL_CONCERN_SLUGS;
}

export async function getConcernBySlug(
  slug: string,
): Promise<ConcernDetailFetched | undefined> {
  const doc = await safeFetch<SanityConcernDetail | null>(concernBySlugQuery, { slug });
  if (doc) {
    const treatmentCards = (doc.treatments ?? []).map((t, i) =>
      mapTreatmentCard(t, `t${i}`),
    );
    return {
      id: doc._id,
      slug: doc.slug,
      name: doc.name,
      icon: doc.icon ?? "◍",
      count: doc.cardTagline ?? "",
      headline: doc.headline ?? "",
      summary: doc.summary ?? "",
      symptoms: doc.symptoms ?? [],
      causes: doc.causes ?? [],
      approach: doc.approach ?? [],
      treatmentSlugs: treatmentCards.map((t) => t.slug),
      faqs: (doc.faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
      imageUrl: doc.image?.url,
      treatmentCards,
    };
  }
  return LOCAL_CONCERNS_FULL.find((c) => c.slug === slug);
}

// ----- Doctors --------------------------------------------------------------

type SanityDoctor = {
  _id: string;
  name: string;
  slug: string;
  title: string;
  imageVariant?: string;
  years?: number;
  focusLine?: string;
  homeBio?: string;
  portrait?: { url?: string };
  shortLine?: string;
  listBio?: string;
  statCreds?: { value: string; superscript?: string; label: string }[];
  listExpertise?: string[];
  tagline?: string;
  detailBio?: string;
  credentials?: { icon: string; title: string; description?: string }[];
  timeline?: { year: string; title: string; description?: string }[];
  expertise?: string[];
  treatments?: { icon?: string; name: string; category?: string }[];
  quotes?: { quote: string; name: string; detail?: string }[];
};

export type DoctorFetched = Doctor & { imageUrl?: string };

function mapDoctor(d: SanityDoctor): DoctorFetched {
  return {
    slug: d.slug,
    name: d.name,
    title: d.title,
    img: d.imageVariant ?? "d1",
    focus: d.focusLine ?? "",
    years: d.years ?? 0,
    homeBio: d.homeBio ?? "",
    short: d.shortLine ?? "",
    listBio: d.listBio ?? "",
    statCreds: (d.statCreds ?? []).map((s) => ({
      n: s.value,
      sup: s.superscript,
      l: s.label,
    })),
    listExpertise: d.listExpertise ?? [],
    tagline: d.tagline ?? "",
    detailBio: d.detailBio ?? "",
    credentials: (d.credentials ?? []).map((c) => ({
      i: c.icon,
      t: c.title,
      d: c.description ?? "",
    })),
    timeline: (d.timeline ?? []).map((t) => ({
      y: t.year,
      t: t.title,
      d: t.description,
    })),
    expertise: d.expertise ?? [],
    treatments: (d.treatments ?? []).map((t) => ({
      i: t.icon ?? "✦",
      n: t.name,
      c: t.category ?? "",
    })),
    quotes: (d.quotes ?? []).map((q) => ({
      q: q.quote,
      n: q.name,
      d: q.detail ?? "",
    })),
    imageUrl: d.portrait?.url,
  };
}

export async function getDoctors(): Promise<DoctorFetched[]> {
  const docs = await safeFetch<SanityDoctor[]>(doctorsQuery);
  if (!isFilled(docs)) return LOCAL_DOCTORS;
  return docs.map(mapDoctor);
}

export async function getDoctorSlugs(): Promise<string[]> {
  const slugs = await safeFetch<string[]>(doctorSlugsQuery);
  if (isFilled(slugs)) return slugs;
  return LOCAL_DOCTOR_SLUGS;
}

export async function getDoctorBySlug(slug: string): Promise<DoctorFetched | undefined> {
  const doc = await safeFetch<SanityDoctor | null>(doctorBySlugQuery, { slug });
  if (doc) return mapDoctor(doc);
  return LOCAL_DOCTORS.find((d) => d.slug === slug);
}

// ----- Results --------------------------------------------------------------

export type ResultFetched = Result & { imageUrl?: string };

export async function getResults(): Promise<ResultFetched[]> {
  const docs = await safeFetch<
    {
      _id: string;
      name: string;
      category: string;
      weeks: string;
      sessions: string;
      patient: string;
      concern: string;
      externalImageUrl?: string;
      image?: { url?: string };
    }[]
  >(resultsQuery);
  if (!isFilled(docs)) return LOCAL_RESULTS;
  return docs.map((d) => ({
    id: d._id,
    name: d.name,
    cat: d.category,
    weeks: d.weeks,
    sessions: d.sessions,
    patient: d.patient,
    concern: d.concern,
    img: d.image?.url || d.externalImageUrl || "",
    imageUrl: d.image?.url || d.externalImageUrl,
  }));
}

// ----- Site singletons ------------------------------------------------------

export type ClinicData = typeof LOCAL_CLINIC & { logoUrl?: string };

export async function getClinic(): Promise<ClinicData> {
  const doc = await safeFetch<{
    name?: string;
    tagline?: string;
    address?: string;
    hours?: string;
    phone?: string;
    phone2?: string;
    email?: string;
    googleMapsEmbedUrl?: string;
    googleMapsLinkUrl?: string;
    shopUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    linkedinUrl?: string;
    logo?: { url?: string };
  } | null>(clinicSettingsQuery);
  if (!doc) return LOCAL_CLINIC;
  return {
    ...LOCAL_CLINIC,
    name: doc.name ?? LOCAL_CLINIC.name,
    tagline: doc.tagline ?? LOCAL_CLINIC.tagline,
    address: doc.address ?? LOCAL_CLINIC.address,
    hours: doc.hours ?? LOCAL_CLINIC.hours,
    phone: doc.phone ?? LOCAL_CLINIC.phone,
    phone2: doc.phone2 ?? LOCAL_CLINIC.phone2,
    email: doc.email ?? LOCAL_CLINIC.email,
    shopUrl: doc.shopUrl ?? LOCAL_CLINIC.shopUrl,
    social: {
      instagram: doc.instagramUrl ?? LOCAL_CLINIC.social.instagram,
      youtube: doc.youtubeUrl ?? LOCAL_CLINIC.social.youtube,
      linkedin: doc.linkedinUrl ?? LOCAL_CLINIC.social.linkedin,
    },
    logoUrl: doc.logo?.url,
  };
}

export type AnnouncementData = {
  enabled: boolean;
  message: string;
  linkLabel?: string;
  linkUrl?: string;
};

export async function getAnnouncement(): Promise<AnnouncementData> {
  const doc = await safeFetch<AnnouncementData | null>(announcementQuery);
  if (doc && typeof doc.message === "string") return doc;
  return {
    enabled: true,
    message: "BOOK A CONSULTATION WITH AN MD DERMATOLOGIST",
    linkLabel: "Book this week →",
    linkUrl: "/#book",
  };
}

export type SiteSettingsData = {
  siteUrl?: string;
  defaultMetaTitle?: string;
  titleTemplate?: string;
  defaultMetaDescription?: string;
  defaultOgImageUrl?: string;
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const doc = await safeFetch<{
    siteUrl?: string;
    defaultMetaTitle?: string;
    titleTemplate?: string;
    defaultMetaDescription?: string;
    defaultOgImage?: { url?: string };
  } | null>(siteSettingsQuery);
  if (!doc) return {};
  return {
    siteUrl: doc.siteUrl,
    defaultMetaTitle: doc.defaultMetaTitle,
    titleTemplate: doc.titleTemplate,
    defaultMetaDescription: doc.defaultMetaDescription,
    defaultOgImageUrl: doc.defaultOgImage?.url,
  };
}

// ----- Homepage strings -----------------------------------------------------

export async function getTestimonials() {
  const docs = await safeFetch<{ quote: string; name: string; detail?: string }[]>(
    testimonialsQuery,
  );
  if (!isFilled(docs)) return LOCAL_TESTIMONIALS;
  return docs.map((d) => ({ q: d.quote, name: d.name, detail: d.detail ?? "" }));
}

export async function getHomepageFaqs() {
  const docs = await safeFetch<{ question: string; answer: string }[]>(homepageFaqsQuery);
  if (!isFilled(docs)) return LOCAL_FAQS;
  return docs.map((d) => ({ q: d.question, a: d.answer }));
}

export async function getEeatPillars() {
  const docs = await safeFetch<{ letter: string; title: string; description: string }[]>(
    eeatPillarsQuery,
  );
  if (!isFilled(docs)) return LOCAL_EEAT;
  return docs.map((d) => ({ letter: d.letter, title: d.title, desc: d.description }));
}

export async function getTrustItems(): Promise<{ icon: string; text: string }[]> {
  const docs = await safeFetch<{ icon: string; text: string }[]>(trustItemsQuery);
  if (!isFilled(docs)) return LOCAL_TRUST_ITEMS;
  return docs;
}
