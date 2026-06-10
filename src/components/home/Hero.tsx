import Link from "next/link";
import BookButton from "@/components/BookButton";
import { Award } from "@/components/icons";
import { getHero } from "@/sanity/lib/fetchers";

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
            {hero.badges.map((b, i) => (
              <div className={`hero-badge hero-badge-${i + 1}`} key={i}>
                {b.icon === "award" ? (
                  <Award />
                ) : (
                  <span className="hero-badge-dot" />
                )}
                {b.text}
              </div>
            ))}
            <div className="hero-img hero-img-main">
              <div className="hero-img-label">{hero.imageMainLabel}</div>
            </div>
            <div className="hero-img hero-img-sub">
              <div className="hero-img-label">{hero.imageSubLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
