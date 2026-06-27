import Link from "next/link";
import BookButton from "@/components/BookButton";
import { getHero } from "@/sanity/lib/fetchers";

import { bgImage } from "@/lib/bgImage";

export default async function Hero() {
  const hero = await getHero();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy reveal">
            <span
              className="eyebrow"
              style={{ marginBottom: 24, display: "inline-flex" }}
            >
              {hero.eyebrow}
            </span>
            <h1 dangerouslySetInnerHTML={{ __html: hero.headline }} />
            <p className="hero-sub">{hero.subhead}</p>
            <div className="hero-cta">
              <BookButton>{hero.primaryCta}</BookButton>
              <Link className="btn btn-ghost" href="#treatments">
                {hero.secondaryCta}
              </Link>
            </div>
            <div className="hero-stats">
              {hero.stats.map((s, i) => (
                <div className="hero-stat" key={i}>
                  <div className="hero-stat-num">
                    {s.value}
                    {s.superscript ? <sup>{s.superscript}</sup> : null}
                  </div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal">
            <div
              className="hero-img hero-img-main"
              style={bgImage(hero.imageMainUrl)}
            />
            <div
              className="hero-img hero-img-sub"
              style={bgImage(hero.imageSubUrl)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
