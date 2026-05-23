import Link from "next/link";
import BookButton from "@/components/BookButton";
import { Award } from "@/components/icons";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy reveal">
            <span
              className="eyebrow"
              style={{ marginBottom: 24, display: "inline-flex" }}
            >
              Dermatology · Aesthetics · Trichology
            </span>
            <h1>
              Skin that knows the<br />
              difference between <em>care</em><br />
              and <em>cosmetics.</em>
            </h1>
            <p className="hero-sub">
              Dwarka&apos;s trusted MD-led dermatology practice, calibrated for Indian
              skin, grounded in clinical evidence, and built around the kind of
              unhurried care that produces real, lasting results.
            </p>
            <div className="hero-cta">
              <BookButton>Book a consultation</BookButton>
              <Link className="btn btn-ghost" href="#treatments">
                Explore treatments
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">
                  27<sup>+</sup>
                </div>
                <div className="hero-stat-label">ADVANCED TREATMENTS</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">3</div>
                <div className="hero-stat-label">MD DERMATOLOGISTS</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">
                  14<sup>yrs</sup>
                </div>
                <div className="hero-stat-label">CARING FOR INDIAN SKIN</div>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="hero-badge hero-badge-1">
              <span className="hero-badge-dot" />
              FDA-approved tech only
            </div>
            <div className="hero-badge hero-badge-2">
              <Award /> MD-Dermatologist led
            </div>
            <div className="hero-img hero-img-main">
              <div className="hero-img-label">Treatment Suite, Dwarka</div>
            </div>
            <div className="hero-img hero-img-sub">
              <div className="hero-img-label">Consultation Room</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
