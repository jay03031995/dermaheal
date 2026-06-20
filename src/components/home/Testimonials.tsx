import { getTestimonials } from "@/sanity/lib/fetchers";
import { CLINIC } from "@/data/clinic";
import GoogleLogo from "@/components/GoogleLogo";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";

const REVIEWS_URL = CLINIC.reviewsUrl;

export default async function Testimonials() {
  const items = await getTestimonials();

  return (
    <section className="section testimonials" id="testimonials">
      <a
        className="testimonials-google"
        href={REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Read our reviews on Google"
      >
        <GoogleLogo size={26} />
        <span>
          <strong>Reviews</strong>
          <small>Verified on Google</small>
        </span>
      </a>
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-copy">
            <div className="eyebrow">Patient stories</div>
            <h2>In their own words.</h2>
          </div>
          <p>
            11,200+ verified reviews across Google, Practo and Justdial. Below
            are a few we couldn&apos;t stop reading.
          </p>
        </div>

        <TestimonialsSlider items={items} />
      </div>
    </section>
  );
}
