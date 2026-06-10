"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "@/components/icons";
import BookButton from "@/components/BookButton";
import { bgImage } from "@/lib/bgImage";
import type { TreatmentCard } from "@/sanity/lib/fetchers";

export default function TreatmentsClient({
  treatments,
  categories,
}: {
  treatments: TreatmentCard[];
  categories: string[];
}) {
  const [cat, setCat] = useState("All");
  const filtered =
    cat === "All" ? treatments : treatments.filter((t) => t.cat === cat);
  // Cap to 11 cards + an "explore" tile
  const displayed = filtered.slice(0, 11);

  return (
    <section className="section treatments" id="treatments">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-copy">
            <div className="eyebrow">Signature treatments</div>
            <h2>Clinically-backed, calibrated, considered.</h2>
          </div>
          <p>
            Every device is FDA-approved, every protocol authored in-house. Tap
            any treatment to read its dedicated page.
          </p>
        </div>

        <div className="filter-bar reveal">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={"filter-chip" + (c === cat ? " active" : "")}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="treatments-grid compact">
          {displayed.map((t) => (
            <Link
              key={t.slug}
              className="treatment-card compact reveal"
              href={`/treatments/${t.slug}`}
            >
              <div
                className={"treatment-img " + t.img}
                style={bgImage(t.imageUrl)}
              >
                {t.tag && <span className="treatment-img-tag">{t.tag}</span>}
                <span className="treatment-img-label">
                  {t.cat.toLowerCase()}
                </span>
              </div>
              <div className="treatment-body">
                <div className="treatment-name">{t.name}</div>
                <div className="treatment-desc">{t.desc}</div>
                <div className="treatment-meta">
                  <span className="treatment-duration">
                    <Calendar /> {t.dur}
                  </span>
                  <span className="treatment-price">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}

          <Link className="treatment-explore-card reveal" href="/treatments">
            <div>
              <div className="tec-eyebrow">{filtered.length} treatments</div>
              <div className="tec-title">
                Explore the full{" "}
                {cat === "All" ? "menu" : cat.toLowerCase() + " menu"}
              </div>
            </div>
            <div className="tec-arrow">
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>

        <div style={{ textAlign: "center", marginTop: 46 }}>
          <BookButton className="btn btn-ghost">
            Get a personalised plan
          </BookButton>
        </div>
      </div>
    </section>
  );
}
