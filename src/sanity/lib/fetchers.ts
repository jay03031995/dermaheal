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
  BOOK as LOCAL_BOOK,
  EEAT as LOCAL_EEAT,
  FAQS as LOCAL_FAQS,
  HERO as LOCAL_HERO,
  RESULTS as LOCAL_RESULTS,
  TESTIMONIALS as LOCAL_TESTIMONIALS,
  TRUST_ITEMS as LOCAL_TRUST_ITEMS,
  WHY as LOCAL_WHY,
  type BookSlotCard,
  type HeroBadge,
  type HeroStat,
  type Result,
} from "@/data/site";

// ----- Shared helpers -------------------------------------------------------

function isFilled<T>(v: T | null | undefined): v is T {
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.length > 0;
  return true;
}

function cleanSiteText(value: string): string {
  return value
    .replace(/\bwith an\s+M\.?D\.?\s+dermatologists?\b/gi, "with skin specialists")
    .replace(/\bwith an\s+M\.?D\.?\s+dermatologist\b/gi, "with a skin specialist")
    .replace(/\ban\s+M\.?D\.?\s+dermatologists?\b/gi, "dermatologists")
    .replace(/\ban\s+M\.?D\.?\s+dermatologist\b/gi, "a dermatologist")
    .replace(/\bboard-certified\s+M\.?D\.?\s+dermatologists?\b/gi, "qualified dermatologists")
    .replace(/\bboard-certified\s+M\.?D\.?\s+dermatologist\b/gi, "qualified dermatologist")
    .replace(/\bM\.?D\.?\s*[- ]\s*dermatologists?\b/gi, "dermatologists")
    .replace(/\bM\.?D\.?\s*[- ]\s*dermatologist\b/gi, "dermatologist")
    .replace(/\bM\.?D\.?\s*[- ]\s*dermatology\b/gi, "dermatology")
    .replace(/\bM\.?D\.?\s*[- ]\s*led\b/gi, "doctor-led")
    .replace(/\bwith an M\.?D\.?\b/gi, "with a skin specialist")
    .replace(/\ban M\.?D\.?\b/gi, "a dermatologist")
    .replace(/\bM\.?D\.?\b/g, "Derm");
}

function cleanContent<T>(value: T): T {
  if (typeof value === "string") return cleanSiteText(value) as T;
  if (Array.isArray(value)) return value.map((item) => cleanContent(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, cleanContent(val)]),
    ) as T;
  }
  return value;
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
  heroImage?: { url?: string };
  shortDescription?: string;
  duration?: string;
  tag?: string;
};

function mapTreatmentCard(d: SanityTreatmentCard, fallbackId: string): Treatment & { slug: string; imageUrl?: string } {
  const clean = cleanContent(d);
  return {
    id: clean._id || fallbackId,
    name: clean.name,
    cat: clean.category?.key ?? "",
    desc: clean.shortDescription ?? "",
    dur: clean.duration ?? "",
    img: clean.imageVariant ?? "v1",
    tag: clean.tag,
    slug: clean.slug,
    // Either uploaded image works as the card cover.
    imageUrl: clean.thumbnail?.url ?? clean.heroImage?.url,
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
  overviewExtra?: string;
  aboutCtaLabel?: string;
  aboutCtaHref?: string;
  quickDuration?: string;
  quickSessions?: string;
  quickDowntime?: string;
  keyPoints?: string[];
  suitableFor?: string[];
  protocols?: { title: string; description: string }[];
  process?: { title: string; description: string }[];
  benefits?: { icon: string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
};

export type TreatmentDetailFetched = TreatmentDetail & { imageUrl?: string };

export async function getTreatmentDetailFetched(
  slug: string,
): Promise<TreatmentDetailFetched | undefined> {
  const doc = await safeFetch<SanityTreatmentDetail | null>(treatmentBySlugQuery, { slug });
  if (doc) {
    const clean = cleanContent(doc);
    return {
      slug: clean.slug,
      name: clean.name,
      cat: clean.category?.title ?? clean.category?.key ?? "",
      img: clean.imageVariant ?? "v1",
      headline: clean.headline ?? "",
      overview: clean.overview ?? "",
      overviewExtra: clean.overviewExtra ?? "",
      aboutCtaLabel: clean.aboutCtaLabel ?? "",
      aboutCtaHref: clean.aboutCtaHref ?? "",
      quick: {
        duration: clean.quickDuration ?? "",
        sessions: clean.quickSessions ?? "",
        downtime: clean.quickDowntime ?? "",
      },
      keyPoints: clean.keyPoints ?? [],
      suitableFor: clean.suitableFor ?? [],
      protocols: clean.protocols ?? [],
      process: (clean.process ?? []).map((s) => ({ t: s.title, d: s.description })),
      benefits: (clean.benefits ?? []).map((b) => ({ i: b.icon, t: b.title, d: b.description })),
      faqs: (clean.faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
      // Detail hero falls back to the card thumbnail so one upload is enough.
      imageUrl: clean.heroImage?.url ?? clean.thumbnail?.url,
    };
  }
  const local = LOCAL_TREATMENTS_FULL[slug];
  return local ? cleanContent(local) : local;
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
  cardImageUrl?: string;
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
  if (!isFilled(docs)) return cleanContent(LOCAL_CONCERNS_FULL);
  // Sanity concern listings only carry the card-level fields; pages that need
  // the full detail call getConcernBySlug.
  return cleanContent(docs).map((d) => ({
    id: d._id,
    slug: d.slug,
    name: d.name,
    icon: d.icon ?? "◍",
    count: d.cardTagline ?? "",
    imageUrl: d.cardImageUrl,
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
    const clean = cleanContent(doc);
    const treatmentCards = (clean.treatments ?? []).map((t, i) =>
      mapTreatmentCard(t, `t${i}`),
    );
    return {
      id: clean._id,
      slug: clean.slug,
      name: clean.name,
      icon: clean.icon ?? "◍",
      count: clean.cardTagline ?? "",
      headline: clean.headline ?? "",
      summary: clean.summary ?? "",
      symptoms: clean.symptoms ?? [],
      causes: clean.causes ?? [],
      approach: clean.approach ?? [],
      treatmentSlugs: treatmentCards.map((t) => t.slug),
      faqs: (clean.faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
      imageUrl: clean.image?.url,
      treatmentCards,
    };
  }
  const local = LOCAL_CONCERNS_FULL.find((c) => c.slug === slug);
  return local ? cleanContent(local) : local;
}

// ----- Doctors --------------------------------------------------------------

type SanityDoctor = {
  _id: string;
  name: string;
  slug: string;
  title: string;
  bookingUrl?: string;
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
  const clean = cleanContent(d);
  return {
    slug: clean.slug,
    name: clean.name,
    title: clean.title,
    bookingUrl: clean.bookingUrl,
    img: clean.imageVariant ?? "d1",
    focus: clean.focusLine ?? "",
    years: clean.years ?? 0,
    homeBio: clean.homeBio ?? "",
    short: clean.shortLine ?? "",
    listBio: clean.listBio ?? "",
    statCreds: (clean.statCreds ?? []).map((s) => ({
      n: s.value,
      sup: s.superscript,
      l: s.label,
    })),
    listExpertise: clean.listExpertise ?? [],
    tagline: clean.tagline ?? "",
    detailBio: clean.detailBio ?? "",
    credentials: (clean.credentials ?? []).map((c) => ({
      i: c.icon,
      t: c.title,
      d: c.description ?? "",
    })),
    timeline: (clean.timeline ?? []).map((t) => ({
      y: t.year,
      t: t.title,
      d: t.description,
    })),
    expertise: clean.expertise ?? [],
    treatments: (clean.treatments ?? []).map((t) => ({
      i: t.icon ?? "✦",
      n: t.name,
      c: t.category ?? "",
    })),
    quotes: (clean.quotes ?? []).map((q) => ({
      q: q.quote,
      n: q.name,
      d: q.detail ?? "",
    })),
    imageUrl: clean.portrait?.url,
  };
}

export async function getDoctors(): Promise<DoctorFetched[]> {
  const docs = await safeFetch<SanityDoctor[]>(doctorsQuery);
  if (!isFilled(docs)) return cleanContent(LOCAL_DOCTORS);
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
  const local = LOCAL_DOCTORS.find((d) => d.slug === slug);
  return local ? cleanContent(local) : local;
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
    facebookUrl?: string;
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
      facebook: doc.facebookUrl ?? LOCAL_CLINIC.social.facebook,
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
  if (doc && typeof doc.message === "string") return cleanContent(doc);
  return {
    enabled: true,
    message: "BOOK A CONSULTATION WITH A SKIN SPECIALIST",
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
  const clean = cleanContent(doc);
  return {
    siteUrl: clean.siteUrl,
    defaultMetaTitle: clean.defaultMetaTitle,
    titleTemplate: clean.titleTemplate,
    defaultMetaDescription: clean.defaultMetaDescription,
    defaultOgImageUrl: clean.defaultOgImage?.url,
  };
}

// ----- Homepage hero & book section -----------------------------------------

export type HeroData = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  stats: HeroStat[];
  badges: HeroBadge[];
  imageMainLabel: string;
  imageSubLabel: string;
  imageMainUrl?: string;
  imageSubUrl?: string;
};

export async function getHero(): Promise<HeroData> {
  const doc = await safeFetch<{
    heroEyebrow?: string;
    heroHeadline?: string;
    heroSubhead?: string;
    heroPrimaryCta?: string;
    heroSecondaryCta?: string;
    heroStats?: HeroStat[];
    heroBadges?: HeroBadge[];
    heroImageMainLabel?: string;
    heroImageSubLabel?: string;
    heroImageMainUrl?: string;
    heroImageSubUrl?: string;
  } | null>(siteSettingsQuery);
  const clean = cleanContent(doc);
  return {
    eyebrow: clean?.heroEyebrow || LOCAL_HERO.eyebrow,
    headline: clean?.heroHeadline || LOCAL_HERO.headline,
    subhead: clean?.heroSubhead || LOCAL_HERO.subhead,
    primaryCta: clean?.heroPrimaryCta || LOCAL_HERO.primaryCta,
    secondaryCta: clean?.heroSecondaryCta || LOCAL_HERO.secondaryCta,
    stats: isFilled(clean?.heroStats) ? clean!.heroStats! : LOCAL_HERO.stats,
    badges: isFilled(clean?.heroBadges) ? clean!.heroBadges! : LOCAL_HERO.badges,
    imageMainLabel: clean?.heroImageMainLabel || LOCAL_HERO.imageMainLabel,
    imageSubLabel: clean?.heroImageSubLabel || LOCAL_HERO.imageSubLabel,
    imageMainUrl: clean?.heroImageMainUrl,
    imageSubUrl: clean?.heroImageSubUrl,
  };
}

export type WhyData = {
  eyebrow: string;
  heading: string;
  statValue: string;
  statSuperscript: string;
  statLabel: string;
  imageLabel: string;
  imageMainUrl?: string;
  imageSubUrl?: string;
};

export async function getWhySection(): Promise<WhyData> {
  const doc = await safeFetch<{
    whyEyebrow?: string;
    whyHeading?: string;
    whyStatValue?: string;
    whyStatSuperscript?: string;
    whyStatLabel?: string;
    whyImageLabel?: string;
    whyImageMainUrl?: string;
    whyImageSubUrl?: string;
  } | null>(siteSettingsQuery);
  const clean = cleanContent(doc);
  return {
    eyebrow: clean?.whyEyebrow || LOCAL_WHY.eyebrow,
    heading: clean?.whyHeading || LOCAL_WHY.heading,
    statValue: clean?.whyStatValue || LOCAL_WHY.statValue,
    statSuperscript: clean?.whyStatSuperscript || LOCAL_WHY.statSuperscript,
    statLabel: clean?.whyStatLabel || LOCAL_WHY.statLabel,
    imageLabel: clean?.whyImageLabel || LOCAL_WHY.imageLabel,
    imageMainUrl: clean?.whyImageMainUrl,
    imageSubUrl: clean?.whyImageSubUrl,
  };
}

export type BookData = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  meta: string[];
  cards: BookSlotCard[];
};

export async function getBook(): Promise<BookData> {
  const doc = await safeFetch<{
    bookEyebrow?: string;
    bookHeading?: string;
    bookBody?: string;
    bookCtaLabel?: string;
    bookMeta?: string[];
    bookCards?: BookSlotCard[];
  } | null>(siteSettingsQuery);
  const clean = cleanContent(doc);
  return {
    eyebrow: clean?.bookEyebrow || LOCAL_BOOK.eyebrow,
    heading: clean?.bookHeading || LOCAL_BOOK.heading,
    body: clean?.bookBody || LOCAL_BOOK.body,
    ctaLabel: clean?.bookCtaLabel || LOCAL_BOOK.ctaLabel,
    meta: isFilled(clean?.bookMeta) ? clean!.bookMeta! : LOCAL_BOOK.meta,
    cards: isFilled(clean?.bookCards) ? clean!.bookCards! : LOCAL_BOOK.cards,
  };
}

// ----- Homepage strings -----------------------------------------------------

export async function getTestimonials() {
  const docs = await safeFetch<{ quote: string; name: string; detail?: string }[]>(
    testimonialsQuery,
  );
  if (!isFilled(docs)) return cleanContent(LOCAL_TESTIMONIALS);
  return cleanContent(docs).map((d) => ({ q: d.quote, name: d.name, detail: d.detail ?? "" }));
}

export async function getHomepageFaqs() {
  const docs = await safeFetch<{ question: string; answer: string }[]>(homepageFaqsQuery);
  if (!isFilled(docs)) return cleanContent(LOCAL_FAQS);
  return cleanContent(docs).map((d) => ({ q: d.question, a: d.answer }));
}

export async function getEeatPillars() {
  const docs = await safeFetch<{ letter: string; title: string; description: string }[]>(
    eeatPillarsQuery,
  );
  if (!isFilled(docs)) return cleanContent(LOCAL_EEAT);
  return cleanContent(docs).map((d) => ({ letter: d.letter, title: d.title, desc: d.description }));
}

export async function getTrustItems(): Promise<{ icon: string; text: string }[]> {
  const docs = await safeFetch<{ icon: string; text: string }[]>(trustItemsQuery);
  if (!isFilled(docs)) return cleanContent(LOCAL_TRUST_ITEMS);
  return cleanContent(docs);
}
