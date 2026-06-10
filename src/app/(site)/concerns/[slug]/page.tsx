import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getConcernBySlug,
  getConcernSlugs,
  getTreatmentDetailFetched,
} from "@/sanity/lib/fetchers";
import { CLINIC, telHref } from "@/data/clinic";
import { ArrowRight, MapPin, Phone } from "@/components/icons";
import BookButton from "@/components/BookButton";
import FaqItem from "@/components/FaqItem";
import JsonLd from "@/components/JsonLd";
import { bgImage } from "@/lib/bgImage";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export async function generateStaticParams() {
  const slugs = await getConcernSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const c = await getConcernBySlug(slug);
  if (!c) return { title: "Concern Not Found" };
  return {
    title: `${c.name} in Dwarka — Dermaheal`,
    description: c.summary,
    alternates: { canonical: `/concerns/${slug}` },
    openGraph: {
      title: `${c.name} — Dermaheal Skin & Hair Clinic`,
      description: c.summary,
      images: c.imageUrl ? [c.imageUrl] : undefined,
    },
  };
}

/** Map concern id → gradient variant for the fallback hero. */
function concernImg(id: string): string {
  const map: Record<string, string> = {
    acne: "v2", pigment: "v6", aging: "v5", hairloss: "v3",
    laser: "v4", glow: "v1", fat: "v4", lift: "v6",
    vitiligo: "v5", tattoo: "v4", nails: "v2", scars: "v3",
  };
  return map[id] ?? "v1";
}

export default async function ConcernDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const c = await getConcernBySlug(slug);
  if (!c) notFound();

  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Concerns", path: "/concerns" },
      { name: c.name, path: `/concerns/${slug}` },
    ]),
    ...(c.faqs.length > 0 ? [faqSchema(c.faqs)] : []),
  ];

  // Sanity returns the related treatment cards inline. Local fallback only
  // stores treatment slugs, so we hydrate them via getTreatmentDetailFetched.
  const treatments =
    c.treatmentCards ??
    (
      await Promise.all(
        (c.treatmentSlugs ?? []).map((s) => getTreatmentDetailFetched(s)),
      )
    )
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map((t) => ({
        slug: t.slug,
        name: t.name,
        cat: t.cat,
        img: t.img,
        desc: t.overview.slice(0, 140).trim() + "…",
        imageUrl: t.imageUrl,
      }));

  return (
    <>
      <JsonLd data={schema} />
      {/* Hero */}
      <section className="tp-hero">
        <div className="container">
          <div className="tp-crumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/concerns">Concerns</Link>
            <span className="sep">/</span>
            <span className="cur">{c.name}</span>
          </div>
          <div className="tp-hero-grid">
            <div>
              <span className="tp-cat-pill">
                <span className="dot" />
                Skin Concern
              </span>
              <h1>{c.headline}</h1>
              <p className="tp-overview">{c.summary}</p>
              <div className="tp-hero-cta">
                <BookButton>Book a consultation</BookButton>
                <a className="btn btn-ghost" href={telHref()}>
                  Call {CLINIC.phone}
                </a>
              </div>
            </div>
            <div className="tp-hero-visual">
              <div className="tp-floating tp-floating-1">
                <div className="tp-float-hd">Concern</div>
                <div className="tp-float-val">{c.name}</div>
              </div>
              <div className="tp-floating tp-floating-2">
                <div className="tp-float-hd">Reviewed by</div>
                <div className="tp-float-val">MD Dermatologists</div>
              </div>
              <div
                className={`tp-img-main ${concernImg(c.id)}`}
                style={bgImage(c.imageUrl)}
              >
                <div className="tp-img-label">— {c.name.toLowerCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      {c.symptoms.length > 0 && (
        <section className="tp-section">
          <div className="container">
            <div className="tp-section-head">
              <div className="eyebrow">What it looks like</div>
              <h2>Signs and symptoms.</h2>
              <p>
                Common ways this concern shows up. Your dermatologist will
                confirm the picture in your consultation.
              </p>
            </div>
            <div className="tp-tags">
              {c.symptoms.map((s, i) => (
                <span className="tp-tag" key={i}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Approach + causes */}
      {(c.approach.length > 0 || c.causes.length > 0) && (
        <section className="tp-section alt">
          <div className="container">
            <div className="tp-about-grid">
              <div className="tp-about-copy">
                <div className="eyebrow" style={{ marginBottom: 16 }}>
                  Our approach
                </div>
                <h2>How we treat {c.name.toLowerCase()}.</h2>
                {c.approach.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <Link className="btn-text" href="/#book">
                  Speak to a dermatologist <ArrowRight size={12} />
                </Link>
              </div>
              <div className="tp-keypoints">
                <h4>Common causes</h4>
                <ul>
                  {c.causes.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related treatments */}
      {treatments.length > 0 && (
        <section className="tp-section">
          <div className="container">
            <div className="tp-section-head">
              <div className="eyebrow">Recommended treatments</div>
              <h2>Procedures we use for this concern.</h2>
              <p>
                Each is performed personally by an MD dermatologist and
                calibrated for your skin.
              </p>
            </div>
            <div className="tp-related">
              {treatments.slice(0, 6).map((t) => (
                <Link
                  className="tp-related-card"
                  key={t.slug}
                  href={`/treatments/${t.slug}`}
                >
                  <div
                    className={"tp-related-img " + t.img}
                    style={bgImage(t.imageUrl)}
                  />
                  <div className="tp-related-body">
                    <div className="tp-related-cat">{t.cat}</div>
                    <div className="tp-related-name">{t.name}</div>
                    <div className="tp-related-desc">{t.desc}</div>
                    <span className="tp-related-link">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {c.faqs.length > 0 && (
        <section className="tp-section alt">
          <div className="container">
            <div className="tp-section-head">
              <div className="eyebrow">Frequently asked</div>
              <h2>{c.name}, answered.</h2>
            </div>
            <div className="tp-faq">
              {c.faqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="tp-cta">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            Ready when you are
          </div>
          <h2>
            Talk to an MD dermatologist about your {c.name.toLowerCase()}.
          </h2>
          <p>
            A one-on-one consultation, a written plan, and honest guidance,
            that&apos;s how every appointment begins.
          </p>
          <BookButton>Book a consultation</BookButton>
          <div className="tp-cta-contacts">
            <span>
              <Phone /> {CLINIC.phone}
            </span>
            <span>
              <Phone /> {CLINIC.phone2}
            </span>
            <span>
              <MapPin /> Dwarka, New Delhi
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
