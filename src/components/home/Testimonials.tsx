import { getTestimonials } from "@/sanity/lib/fetchers";
import { ArrowRight } from "@/components/icons";

const REVIEWS_URL = "https://share.google/dc4lU10Jdo97k42ij";

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default async function Testimonials() {
  const items = await getTestimonials();

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-copy">
            <div className="eyebrow">Patient stories</div>
            <h2>In their own words.</h2>
          </div>
          <p>
            11,200+ verified reviews across Google, Practo and Justdial. Below
            are three we couldn&apos;t stop reading.
          </p>
        </div>
        <div className="testimonials-track">
          {items.map((t, i) => (
            <div className="testimonial reveal" key={i}>
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
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <a
            className="btn btn-ghost"
            href={REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all reviews on Google
            <span className="arrow">
              <ArrowRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
