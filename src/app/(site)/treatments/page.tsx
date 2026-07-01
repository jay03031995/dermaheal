import type { Metadata } from "next";
import Link from "next/link";
import {
  getTreatmentCards,
  getTreatmentCategories,
} from "@/sanity/lib/fetchers";
import { ArrowRight, Clock, Tag } from "@/components/icons";
import CategoryNav from "@/components/CategoryNav";
import { bgImage } from "@/lib/bgImage";

export const metadata: Metadata = {
  title: "All Treatments — 27 advanced dermatology procedures",
  description:
    "Dermaheal Skin & Hair Clinic, Dwarka offers 27 advanced treatments across hair restoration, injectables, lasers, peels, regenerative medicine and day-care surgery. Calibrated for Indian skin.",
  alternates: { canonical: "/treatments" },
};

export default async function TreatmentsPage() {
  const [allTreatments, categories] = await Promise.all([
    getTreatmentCards(),
    getTreatmentCategories(),
  ]);

  const catChips = categories.map((c) => ({
    key: c.key,
    title: c.title,
    count: allTreatments.filter((t) => t.cat === c.key).length,
  }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Our complete service menu
          </div>
          <h1>
            Twenty-seven treatments,
            <br />
            one <em>standard of care.</em>
          </h1>
          <p>
            Every protocol is calibrated for Indian skin. And every procedure
            is performed personally by an MD dermatologist, never delegated.
          </p>
          <div className="page-hero-stats">
            <div className="page-hero-stat">
              <div className="page-hero-stat-num">
                {allTreatments.length}<sup>+</sup>
              </div>
              <div className="page-hero-stat-label">Treatments offered</div>
            </div>
            <div className="page-hero-stat">
              <div className="page-hero-stat-num">{categories.length}</div>
              <div className="page-hero-stat-label">Specialties covered</div>
            </div>
            <div className="page-hero-stat">
              <div className="page-hero-stat-num">
                100<sup>%</sup>
              </div>
              <div className="page-hero-stat-label">MD-Dermatologist led</div>
            </div>
          </div>
        </div>
      </section>

      <CategoryNav categories={catChips} total={allTreatments.length} />

      {categories.map((c, ci) => {
        const items = allTreatments.filter((t) => t.cat === c.key);
        return (
          <section
            key={c.key}
            id={`cat-${c.key}`}
            className={"cat-section" + (ci % 2 === 1 ? " alt" : "")}
            style={{
              background: ci % 2 === 0 ? "var(--cream)" : "var(--paper)",
            }}
          >
            <div className="container">
              <div className="cat-head">
                <div>
                  <div className="cat-eyebrow">
                    {c.key} · {items.length} treatments
                  </div>
                  <div className="cat-title">{c.title}</div>
                </div>
                <div className="cat-desc">{c.desc}</div>
              </div>
              <div>
                {items.map((t) => (
                  <Link
                    key={t.slug}
                    className="trow"
                    href={`/treatments/${t.slug}`}
                  >
                    <div
                      className={"trow-img " + t.img}
                      style={bgImage(t.imageUrl)}
                    >
                      {t.tag && <span className="trow-tag">{t.tag}</span>}
                    </div>
                    <div className="trow-body">
                      <div className="trow-name">{t.name}</div>
                      <div className="trow-desc">{t.desc}</div>
                      <div className="trow-meta">
                        <span className="trow-meta-item">
                          <Clock size={12} /> {t.dur}
                        </span>
                        <span className="trow-meta-item">
                          <Tag /> {t.cat}
                        </span>
                      </div>
                    </div>
                    <span className="trow-cta">
                      Learn more <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
