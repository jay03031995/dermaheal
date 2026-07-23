import type { Metadata } from "next";
import { CLINIC } from "@/data/clinic";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for using the Dermaheal Skin & Hair Clinic website and services.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Terms & Conditions
          </div>
          <h1>
            Terms for using this <em>website and our services.</em>
          </h1>
          <p>
            Please read these terms before using this website, booking an
            appointment, purchasing products, or communicating with Dermaheal
            Skin & Hair Clinic.
          </p>
        </div>
      </section>

      <section className="legal-section">
        <div className="container legal-wrap">
          <p className="legal-meta">Last updated: July 17, 2026</p>

          <div className="legal-card">
            <section>
              <h2>Use of this website</h2>
              <p>
                This website is provided for general information about
                dermatology, aesthetic, hair, and skin services offered by{" "}
                {CLINIC.name}. By using the site, you agree not to misuse it,
                interfere with its operation, or submit false or unlawful
                information.
              </p>
            </section>

            <section>
              <h2>Medical information</h2>
              <p>
                Content on this website is educational and does not replace a
                consultation with a qualified dermatologist. Diagnosis,
                treatment suitability, pricing, downtime, and expected outcomes
                can vary by patient and are confirmed during consultation.
              </p>
            </section>

            <section>
              <h2>Appointments and communication</h2>
              <p>
                Appointment requests made through the website, phone, WhatsApp,
                email, or third-party platforms are subject to confirmation by
                the clinic. We may contact you to verify details, reschedule
                appointments, or share pre-visit and follow-up instructions.
              </p>
            </section>

            <section>
              <h2>Treatments, results, and pricing</h2>
              <p>
                Treatment plans and fees are based on clinical assessment and
                may change depending on your concern, skin or hair condition,
                procedure complexity, products used, and follow-up needs. Images
                and testimonials shown on the site are examples and do not
                guarantee identical results.
              </p>
            </section>

            <section>
              <h2>Products and external links</h2>
              <p>
                The website may link to our shop, social media pages, maps,
                review platforms, payment services, or other third-party
                websites. Those services may have their own terms and policies,
                and we are not responsible for their content or practices.
              </p>
            </section>

            <section>
              <h2>Intellectual property</h2>
              <p>
                Website text, design, images, branding, and other content belong
                to Dermaheal or are used with permission. You may not copy,
                reproduce, publish, or commercially use website content without
                written permission.
              </p>
            </section>

            <section>
              <h2>Limitation of liability</h2>
              <p>
                We aim to keep website information accurate and current, but we
                do not guarantee that every page is always complete or error
                free. To the extent permitted by law, Dermaheal is not liable
                for losses arising from website use or reliance on general
                website information without clinical consultation.
              </p>
            </section>

            <section>
              <h2>Contact us</h2>
              <p>
                Questions about these terms can be sent to {CLINIC.email} or
                discussed with our team at {CLINIC.phone}. Our clinic address is{" "}
                {CLINIC.address}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
