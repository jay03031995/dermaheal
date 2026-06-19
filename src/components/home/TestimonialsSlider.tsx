"use client";

import { useRef } from "react";
import { CLINIC } from "@/data/clinic";
import GoogleLogo from "@/components/GoogleLogo";

type Item = { q: string; name: string; detail: string };

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function TestimonialsSlider({ items }: { items: Item[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".testimonial");
    const step = card ? card.offsetWidth + 22 : track.clientWidth * 0.85;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="tslider">
      <button
        type="button"
        className="tslider-btn prev"
        aria-label="Previous reviews"
        onClick={() => scroll(-1)}
      >
        ‹
      </button>
      <div className="tslider-track" ref={trackRef}>
        {items.map((t, i) => (
          <div className="testimonial reveal" key={i}>
            <a
              className="testimonial-google"
              href={CLINIC.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View this review on Google"
            >
              <GoogleLogo size={20} />
            </a>
            <div className="testimonial-stars">★ ★ ★ ★ ★</div>
            <div className="testimonial-quote">{t.q}</div>
            <div className="testimonial-meta">
              <div className="testimonial-avatar">{initials(t.name)}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-detail">{t.detail}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="tslider-btn next"
        aria-label="Next reviews"
        onClick={() => scroll(1)}
      >
        ›
      </button>
    </div>
  );
}
