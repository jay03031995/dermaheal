import { CLINIC } from "@/data/clinic";
import { ArrowRight, Bag } from "@/components/icons";

/**
 * Full-width promotional band that drives traffic to the external shop.
 * Placed between content sections on the homepage.
 */
export default function ShopCta() {
  return (
    <section className="shop-cta">
      <div className="container">
        <div className="shop-cta-inner">
          <div className="shop-cta-copy">
            <div className="shop-cta-eyebrow">
              <Bag /> The Dermaheal Store
            </div>
            <h2>
              Dermatologist-formulated skincare,{" "}
              <em>delivered to your door.</em>
            </h2>
            <p>
              The same actives our doctors prescribe in clinic — cleansers,
              serums, sunscreens and post-procedure care, curated for Indian
              skin. No guesswork, no counterfeits.
            </p>
          </div>
          <a
            className="btn btn-light shop-cta-btn"
            href={CLINIC.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop the store
            <span className="arrow">
              <ArrowRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
