import type { Metadata } from "next";
import Link from "next/link";
import { getConcerns } from "@/sanity/lib/fetchers";
import { ArrowRight } from "@/components/icons";
import { bgImage } from "@/lib/bgImage";

export const metadata: Metadata = {
  title: "Skin & Hair Concerns — Treatments at Dermaheal Dwarka",
  description:
    "Twelve common skin and hair concerns mapped to proven, dermatologist-led treatments at Dermaheal Skin & Hair Clinic, Dwarka.",
  alternates: { canonical: "/concerns" },
};

export default async function ConcernsPage() {
  const concerns = await getConcerns();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Start with your concern
          </div>
          <h1>
            Twelve concerns,{" "}
            <em>one place to address them.</em>
          </h1>
          <p>
            From cystic acne to age-related volume loss, every concern is mapped
            to a treatment plan reviewed personally by a dermatologist.
          </p>
        </div>
      </section>

      <section className="tp-section">
        <div className="container">
          <div className="concerns-grid">
            {concerns.map((c) => (
              <Link
                key={c.id}
                className={"concern" + (c.imageUrl ? " has-img" : "")}
                href={`/concerns/${c.slug}`}
                style={{ aspectRatio: "1 / 1.05" }}
              >
                {c.imageUrl ? (
                  <div className="concern-img" style={bgImage(c.imageUrl)} />
                ) : (
                  <div className="concern-icon">{c.icon}</div>
                )}
                <div>
                  <div className="concern-name">{c.name}</div>
                  <div className="concern-count">{c.count}</div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link className="btn btn-ghost" href="/#book">
              Talk to a dermatologist about your concern{" "}
              <span className="arrow">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
