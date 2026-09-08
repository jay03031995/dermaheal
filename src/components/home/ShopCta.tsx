import { CLINIC } from "@/data/clinic";
import { ArrowRight, Bag } from "@/components/icons";

/**
 * Full-width promotional band for the shop.
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
          </div>
          <a
            className="btn btn-light shop-cta-btn shop-cta-btn-blink"
            href={CLINIC.shopUrl}
            target={CLINIC.shopUrl.startsWith("http") ? "_blank" : undefined}
            rel={CLINIC.shopUrl.startsWith("http") ? "noopener noreferrer" : undefined}
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
