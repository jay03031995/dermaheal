import { CLINIC } from "@/data/clinic";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

/** Stable @id for the clinic so other nodes can reference it by graph link. */
const CLINIC_ID = `${SITE_URL}/#clinic`;

const abs = absoluteUrl;

/**
 * Site-wide LocalBusiness node (MedicalClinic). Rendered once in the site
 * layout. Other page-level nodes (procedures, physicians) reference it via
 * `@id` rather than duplicating the NAP data.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": CLINIC_ID,
  name: CLINIC.name,
  description:
    "Skin and hair clinic in Dwarka, New Delhi offering advanced dermatology, aesthetics and trichology treatments calibrated for Indian skin.",
  url: SITE_URL,
  logo: abs("/dermaheal-logo.png"),
  image: abs("/og-image.png"),
  telephone: [CLINIC.phone, CLINIC.phone2].map((p) => p.replace(/\s/g, "")),
  email: CLINIC.email,
  priceRange: "$$",
  currenciesAccepted: "INR",
  medicalSpecialty: "Dermatology",
  address: {
    "@type": "PostalAddress",
    streetAddress: "C-712, Ramphal Chowk, Block D, Sector 7 Dwarka, Palam",
    addressLocality: "Dwarka",
    addressRegion: "Delhi",
    postalCode: "110075",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: "28.5866", longitude: "77.0336" },
  hasMap: "https://www.google.com/maps/search/?api=1&query=28.5866,77.0336",
  areaServed: ["Dwarka", "Palam", "West Delhi", "New Delhi", "Gurgaon"].map(
    (name) => ({ "@type": "City", name }),
  ),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    CLINIC.social.instagram,
    CLINIC.social.youtube,
    CLINIC.social.facebook,
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: CLINIC.name,
  url: SITE_URL,
  publisher: { "@id": CLINIC_ID },
};

type Crumb = { name: string; path: string };

/** BreadcrumbList matching the visible crumbs on a page. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/** FAQPage built from the same Q&A pairs rendered on the page. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** MedicalProcedure node for a treatment detail page. */
export function medicalProcedureSchema(t: {
  name: string;
  description: string;
  slug: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${abs(`/treatments/${t.slug}`)}#procedure`,
    name: t.name,
    description: t.description,
    url: abs(`/treatments/${t.slug}`),
    ...(t.imageUrl ? { image: t.imageUrl } : {}),
    provider: { "@id": CLINIC_ID },
  };
}

/** Person node for a doctor profile, linked to the clinic. */
export function physicianSchema(d: {
  name: string;
  title: string;
  bio: string;
  slug: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${abs(`/doctors/${d.slug}`)}#person`,
    name: d.name,
    description: d.bio,
    url: abs(`/doctors/${d.slug}`),
    ...(d.imageUrl ? { image: d.imageUrl } : {}),
    jobTitle: d.title,
    worksFor: { "@id": CLINIC_ID },
    knowsAbout: ["Dermatology", "Cosmetology", "Trichology"],
  };
}
