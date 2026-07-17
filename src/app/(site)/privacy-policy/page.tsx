import type { Metadata } from "next";
import { CLINIC } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Dermaheal Skin & Hair Clinic, Dwarka, New Delhi.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Privacy Policy
          </div>
          <h1>
            How we handle your <em>personal information.</em>
          </h1>
          <p>
            This policy explains what information Dermaheal Skin & Hair Clinic
            may collect through this website, appointment requests, phone,
            WhatsApp, email, and in-clinic communication.
          </p>
        </div>
      </section>

      <section className="legal-section">
        <div className="container legal-wrap">
          <p className="legal-meta">Last updated: July 17, 2026</p>

          <div className="legal-card">
            <section>
              <h2>Information we collect</h2>
              <p>
                We may collect your name, phone number, email address, preferred
                appointment details, concern or treatment interest, and messages
                you share with us. If you visit the clinic, medical history,
                photographs, prescriptions, consent forms, and treatment records
                may be collected as part of clinical care.
              </p>
            </section>

            <section>
              <h2>How we use information</h2>
              <p>
                We use your information to respond to enquiries, schedule and
                manage appointments, provide dermatology and aesthetic care,
                share follow-up instructions, maintain records, improve our
                services, and comply with applicable legal or professional
                obligations.
              </p>
            </section>

            <section>
              <h2>Website and analytics data</h2>
              <p>
                Our website may collect basic technical information such as
                device type, browser, pages visited, approximate location, and
                referral source through cookies or analytics tools. This helps
                us understand website performance and improve the visitor
                experience.
              </p>
            </section>

            <section>
              <h2>Sharing of information</h2>
              <p>
                We do not sell personal information. We may share limited
                information with doctors, staff, service providers, payment or
                communication platforms, diagnostic partners, or legal
                authorities where required for care delivery, operations,
                compliance, or safety.
              </p>
            </section>

            <section>
              <h2>Medical confidentiality</h2>
              <p>
                Clinical information is handled with care and shared internally
                only with team members who need it to provide or coordinate
                care. Before-and-after images or testimonials are used publicly
                only with patient permission.
              </p>
            </section>

            <section>
              <h2>Your choices</h2>
              <p>
                You may request access, correction, or deletion of your personal
                information, subject to records we are required or permitted to
                retain. You may also opt out of non-essential promotional
                communication.
              </p>
            </section>

            <section>
              <h2>Contact us</h2>
              <p>
                For privacy-related requests, contact {CLINIC.name} at{" "}
                {CLINIC.email}, {CLINIC.phone}, or visit us at {CLINIC.address}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
