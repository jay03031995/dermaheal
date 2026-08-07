"use client";

import { useMemo, useState } from "react";
import type { GalleryItem } from "@/data/gallery";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "clinic", label: "Clinic" },
  { value: "equipment", label: "Equipments" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<FilterValue>("all");

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((item) => item.category === active)),
    [active, items],
  );

  return (
    <div className="gallery-wrap">
      <div className="results-filter gallery-filter" aria-label="Gallery filters">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={"filter-chip" + (active === filter.value ? " active" : "")}
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filtered.map((item) => (
          <article className="gallery-card" key={item.id}>
            <img src={item.imageUrl} alt={item.alt} loading="lazy" />
            <div className="gallery-card-meta">
              <span>{item.category === "clinic" ? "Clinic" : "Equipments"}</span>
              <strong>{item.title}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
