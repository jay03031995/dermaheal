"use client";

import { useState } from "react";
import { CATEGORIES, TREATMENTS } from "@/data/treatments";

export default function CategoryNav() {
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
          All<span className="cat-nav-count">{TREATMENTS.length}</span>
        </button>
        {CATEGORIES.map((c) => {
          const count = TREATMENTS.filter((t) => t.cat === c.key).length;
          return (
            <button
              key={c.key}
              type="button"
              className={
                "cat-nav-chip" + (active === c.key ? " active" : "")
              }
              onClick={() => onPick(c.key)}
            >
              {c.title}
              <span className="cat-nav-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
