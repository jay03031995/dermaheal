import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDoctors,
  getTreatmentCards,
  getTreatmentDetailFetched,
  getTreatmentSlugs,
} from "@/sanity/lib/fetchers";
import { CLINIC, telHref } from "@/data/clinic";
import { ArrowRight, MapPin, Phone } from "@/components/icons";
import BookButton from "@/components/BookButton";
import FaqItem from "@/components/FaqItem";
import JsonLd from "@/components/JsonLd";
import { bgImage } from "@/lib/bgImage";
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
} from "@/lib/schema";

const ROMAN = ["i", "ii", "iii", "iv"];

export async function generateStaticParams() {
  const slugs = await getTreatmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const t = await getTreatmentDetailFetched(slug);
  if (!t) return { title: "Treatment Not Found" };
  return {
    title: `${t.name} in Dwarka — Dermaheal`,
    description: t.overview,
    alternates: { canonical: `/treatments/${slug}` },
    openGraph: {
      title: `${t.name} — Dermaheal Skin & Hair Clinic`,
      description: t.overview,
      images: t.imageUrl ? [t.imageUrl] : undefined,
    },
  };
}

export default async function TreatmentDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const [t, allTreatments, doctors] = await Promise.all([
    getTreatmentDetailFetched(slug),
    getTreatmentCards(),
    getDoctors(),
  ]);
  if (!t) notFound();

  // Prefer treatments in the same category for more relevant internal links,
  // then top up with others so there are always three.
  const others = allTreatments.filter((x) => x.slug !== slug);
  const related = [
    ...others.filter((x) => x.cat === t.cat),
    ...others.filter((x) => x.cat !== t.cat),
  ].slice(0, 3);

  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Treatments", path: "/treatments" },
      { name: t.name, path: `/treatments/${slug}` },
    ]),
    medicalProcedureSchema({
      name: t.name,
      description: t.overview,
      slug,
      imageUrl: t.imageUrl,
    }),
    ...(t.faqs.length > 0 ? [faqSchema(t.faqs)] : []),
  ];

  return (
    <>
      <JsonLd data={schema} />
      {/* Hero */}
      <section className="tp-hero">
        <div className="container">
          <div className="tp-crumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/treatments">Treatments</Link>
            <span className="sep">/</span>
            <span className="cur">{t.name}</span>
          </div>
          <div className="tp-hero-grid">
            <div>
              <span className="tp-cat-pill">
                <span className="dot" />
                {t.cat}
              </span>
              <h1>{t.headline}</h1>
              <p className="tp-overview">{t.overview}</p>
              <div className="tp-quick">
                <div className="tp-quick-item">
                  <div className="tp-quick-label">Duration</div>
                  <div className="tp-quick-val">{t.quick.duration}</div>
                </div>
                <div className="tp-quick-item">
                  <div className="tp-quick-label">Sessions</div>
                  <div className="tp-quick-val">{t.quick.sessions}</div>
                </div>
                <div className="tp-quick-item">
                  <div className="tp-quick-label">Downtime</div>
                  <div className="tp-quick-val">{t.quick.downtime}</div>
                </div>
              </div>
              <div className="tp-hero-cta">
                <BookButton>Book a consultation</BookButton>
                <a className="btn btn-ghost" href={telHref()}>
                  Call {CLINIC.phone}
                </a>
              </div>
            </div>
            <div className="tp-hero-visual">
              <div className="tp-floating tp-floating-1">
                <div className="tp-float-hd">Performed by</div>
                <div className="tp-float-val">MD Dermatologists</div>
              </div>
              <div className="tp-floating tp-floating-2">
                <div className="tp-float-hd">Calibrated for</div>
                <div className="tp-float-val">Indian skin tones</div>
              </div>
              <div
                className={"tp-img-main " + t.img}
                style={bgImage(t.imageUrl)}
              >
                <div className="tp-img-label">— {t.name.toLowerCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About + key points */}
      <section className="tp-section">
        <div className="container">
          <div className="tp-about-grid">
            <div className="tp-about-copy">
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                About the treatment
              </div>
              <h2>{t.headline}</h2>
              <p>{t.overview}</p>
              <p>
                {t.overviewExtra ||
                  `Every ${t.name.toLowerCase()} session at Dermaheal is performed by a board-certified MD dermatologist, using internationally approved products and protocols calibrated specifically for Indian skin.`}
              </p>
              <Link className="btn-text" href="/#book">
                Speak to a dermatologist <ArrowRight size={12} />
              </Link>
            </div>
            <div className="tp-keypoints">
              <h4>What makes it work</h4>
              <ul>
                {t.keyPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="tp-section alt">
        <div className="container">
          <div className="tp-section-head">
            <div className="eyebrow">How it works</div>
            <h2>The four-step procedure.</h2>
            <p>
              Designed to feel unhurried, explained at every step, and centred
              entirely on your safety and comfort.
            </p>
          </div>
          <div className="tp-process">
            {t.process.map((s, i) => (
              <div className="tp-step" key={i}>
                <div className="tp-step-num">{ROMAN[i]}</div>
                <div className="tp-step-title">{s.t}</div>
                <div className="tp-step-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol options */}
      {t.protocols && t.protocols.length > 0 && (
        <section className="tp-section">
          <div className="container">
            <div className="tp-section-head">
              <div className="eyebrow">Protocol options</div>
              <h2>Approaches we offer.</h2>
              <p>
                Your dermatologist recommends the right protocol for {t.name}{" "}
                after a one-on-one assessment.
              </p>
            </div>
            <div className="tp-benefits">
              {t.protocols.map((p, i) => (
                <div className="tp-benefit" key={i}>
                  <div className="tp-benefit-title">{p.title}</div>
                  <div className="tp-benefit-desc">{p.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Suitable for */}
      <section className="tp-section">
        <div className="container">
          <div className="tp-section-head">
            <div className="eyebrow">Suitable for</div>
            <h2>Who this treatment is for.</h2>
            <p>
              Best results are achieved when the treatment matches your
              concern. Here are the concerns where {t.name} typically delivers
              excellent outcomes.
            </p>
          </div>
          <div className="tp-tags">
            {t.suitableFor.map((s, i) => (
              <span className="tp-tag" key={i}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="tp-section alt">
        <div className="container">
          <div className="tp-section-head">
            <div className="eyebrow">Why choose this</div>
            <h2>Six reasons patients pick this protocol.</h2>
          </div>
          <div className="tp-benefits">
            {t.benefits.map((b, i) => (
              <div className="tp-benefit" key={i}>
                <div className="tp-benefit-icon">{b.i}</div>
                <div className="tp-benefit-title">{b.t}</div>
                <div className="tp-benefit-desc">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="tp-section">
        <div className="container">
          <div className="tp-section-head">
            <div className="eyebrow">Performed by</div>
            <h2>Treated by MD dermatologists. Always.</h2>
            <p>
              Every procedure at Dermaheal is performed personally by a
              board-certified MD dermatologist, never delegated to a therapist.
            </p>
          </div>
          <div className="tp-doctors">
            {doctors.map((d) => (
              <Link
                className="tp-doctor"
                key={d.slug}
                href={`/doctors/${d.slug}`}
              >
                <div
                  className={"tp-doctor-img " + d.img}
                  style={bgImage(d.imageUrl)}
                />
                <div className="tp-doctor-body">
                  <div className="tp-doctor-name">{d.name}</div>
                  <div className="tp-doctor-title">{d.title}</div>
                  <div className="tp-doctor-exp">
                    MD-DVL · {d.years}+ years
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tp-section alt">
        <div className="container">
          <div className="tp-section-head">
            <div className="eyebrow">Frequently asked</div>
            <h2>{t.name}, answered.</h2>
          </div>
          <div className="tp-faq">
            {t.faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="tp-section">
        <div className="container">
          <div className="tp-section-head">
            <div className="eyebrow">Related treatments</div>
            <h2>Often considered alongside.</h2>
          </div>
          <div className="tp-related">
            {related.map((r) => (
              <Link
                className="tp-related-card"
                key={r.slug}
                href={`/treatments/${r.slug}`}
              >
                <div
                  className={"tp-related-img " + r.img}
                  style={bgImage(r.imageUrl)}
                />
                <div className="tp-related-body">
                  <div className="tp-related-cat">{r.cat}</div>
                  <div className="tp-related-name">{r.name}</div>
                  <div className="tp-related-desc">{r.desc}</div>
                  <span className="tp-related-link">
                    Learn more <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tp-cta">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            Ready to begin
          </div>
          <h2>Book your {t.name} consultation today.</h2>
          <p>
            A one-on-one with an MD dermatologist. A written plan. No upsells.
            Walk out knowing exactly what&apos;s right for your skin.
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
