"use client";

import { useState } from "react";

type CatChip = { key: string; title: string; count: number };

export default function CategoryNav({
  categories,
  total,
}: {
  categories: CatChip[];
  total: number;
}) {
  const [active, setActive] = useState("all");

  const onPick = (key: string) => {
    setActive(key);
    if (key === "all") {
      window.scrollTo({ top: 280, behavior: "smooth" });
    } else {
      const el = document.getElementById(`cat-${key}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="cat-nav">
      <div className="cat-nav-inner">
        <button
          type="button"
          className={"cat-nav-chip" + (active === "all" ? " active" : "")}
          onClick={() => onPick("all")}
        >
          All<span className="cat-nav-count">{total}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            className={"cat-nav-chip" + (active === c.key ? " active" : "")}
            onClick={() => onPick(c.key)}
          >
            {c.title}
            <span className="cat-nav-count">{c.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
