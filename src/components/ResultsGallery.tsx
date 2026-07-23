"use client";

import { useCallback, useEffect, useState } from "react";
import { RESULT_CATS } from "@/data/site";
import { normalizeAssetUrl } from "@/lib/seo";
import type { ResultFetched } from "@/sanity/lib/fetchers";

export default function ResultsGallery({ results }: { results: ResultFetched[] }) {
  const [cat, setCat] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    cat === "All" ? results : results.filter((r) => r.cat === cat);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  // Keyboard controls + body scroll lock while the viewer is open.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, step]);

  const selectCat = (c: string) => {
    setCat(c);
    setOpenIndex(null);
  };

  const current = openIndex === null ? null : filtered[openIndex];
  const imageSrc = (r: ResultFetched) => normalizeAssetUrl(r.imageUrl || r.img) || "";

  return (
    <>
      <div className="results-filter">
        {RESULT_CATS.map((c) => (
          <button
            key={c}
            type="button"
            className={"filter-chip" + (c === cat ? " active" : "")}
            onClick={() => selectCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="tp-gallery">
        {filtered.map((r, i) => (
          <article className="tp-ba-card" key={r.id}>
            <button
              type="button"
              className="tp-ba-frame"
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${r.name} before and after result`}
            >
              <img
                src={imageSrc(r)}
                alt={`${r.name} before and after at Dermaheal`}
                loading="lazy"
              />
              <div className="tp-ba-pill-row">
                <span className="tp-ba-pill">Before</span>
                <span className="tp-ba-pill after">After</span>
              </div>
              <span className="tp-ba-zoom" aria-hidden="true">
                Click to enlarge
              </span>
            </button>
            <div className="tp-ba-body">
              <div className="tp-ba-protocol">{r.cat}</div>
              <div className="tp-ba-title">{r.name}</div>
              <div className="tp-ba-detail">
                {r.patient} · {r.concern} · {r.sessions} · photographed{" "}
                {r.weeks} after start
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="tp-ba-disclaimer">
        Photos shared with patient consent. Individual results vary based on
        skin type, lifestyle and adherence to the prescribed protocol.
      </p>

      {current && (
        <div
          className="ba-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.name} before and after`}
          onClick={close}
        >
          <button
            type="button"
            className="ba-lightbox-close"
            aria-label="Close"
            onClick={close}
          >
            ×
          </button>
          {filtered.length > 1 && (
            <button
              type="button"
              className="ba-lightbox-nav prev"
              aria-label="Previous result"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              ‹
            </button>
          )}
          <figure className="ba-lightbox-fig" onClick={(e) => e.stopPropagation()}>
            <img
              src={imageSrc(current)}
              alt={`${current.name} before and after at Dermaheal`}
            />
            <figcaption>
              <div className="ba-lightbox-title">{current.name}</div>
              <div className="ba-lightbox-detail">
                {current.patient} · {current.concern} · {current.sessions} ·
                photographed {current.weeks} after start
              </div>
            </figcaption>
          </figure>
          {filtered.length > 1 && (
            <button
              type="button"
              className="ba-lightbox-nav next"
              aria-label="Next result"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
