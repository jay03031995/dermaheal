import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import BookButton from "@/components/BookButton";
import { getGalleryImages } from "@/sanity/lib/fetchers";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Clinic Gallery - Dermaheal Skin & Hair Clinic Dwarka",
  description:
    "Explore Dermaheal Skin & Hair Clinic's clinic spaces and dermatology equipment gallery in Dwarka, New Delhi.",
  canonical: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGalleryImages();

  return (
    <>
      <section className="page-hero gallery-hero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Clinic gallery
          </div>
          <h1>
            A closer look at <em>Dermaheal.</em>
          </h1>
          <p>
            Browse our clinic spaces and advanced dermatology equipment. Use
            the filters to view clinic photos, equipment photos, or the full
            gallery together.
          </p>
        </div>
      </section>

      <section className="tp-section gallery-section">
        <div className="container">
          <div className="tp-section-head">
            <div className="eyebrow">Clinic & equipments</div>
            <h2>Explore the gallery.</h2>
          <p>
            New images can be added from Sanity Studio and will appear here
            automatically once published.
            </p>
          </div>

          <GalleryGrid items={items} />
        </div>
      </section>

      <section className="tp-cta">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            Visit us in Dwarka
          </div>
          <h2>See the clinic in person.</h2>
          <p>
            Book a consultation and meet the team behind Dermaheal&apos;s skin,
            hair and aesthetic care.
          </p>
          <BookButton>Book a consultation</BookButton>
        </div>
      </section>
    </>
  );
}
