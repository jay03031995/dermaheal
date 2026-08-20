import TrackedLeadLink from "@/components/TrackedLeadLink";
import { Phone, WhatsappFilled } from "@/components/icons";
import type { ClinicData } from "@/sanity/lib/fetchers";

const digits = (s: string) => s.replace(/[^0-9]/g, "");

const telHref = (phone: string) => "tel:" + phone.replace(/\s/g, "");

const waHref = (phone: string, text?: string) => {
  const base = "https://wa.me/91" + digits(phone).slice(-10);
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

type Props = {
  clinic: ClinicData;
};

export default function FabStack({ clinic }: Props) {
  const wa = waHref(clinic.phone, "Hi Dermaheal, I'd like to book a consultation.");

  return (
    <div className="fab-stack">
      <a
        className="fab-shop fab-pulse"
        href={clinic.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Shop Now"
      >
        <span className="fab-shop-text">Shop Now</span>
      </a>
      <TrackedLeadLink
        className="fab fab-call"
        href={telHref(clinic.phone)}
        aria-label={`Call ${clinic.phone}`}
        lead={{
          channel: "call",
          label: "Floating call button",
          location: "floating-cta",
          targetPhone: clinic.phone,
          source: "website-floating-cta",
        }}
      >
        <Phone size={22} stroke={2} />
        <span className="fab-tip">Call {clinic.phone}</span>
      </TrackedLeadLink>
      <TrackedLeadLink
        className="fab fab-wa"
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        lead={{
          channel: "whatsapp",
          label: "Floating WhatsApp button",
          location: "floating-cta",
          targetPhone: clinic.phone,
          source: "website-floating-cta",
        }}
      >
        <WhatsappFilled />
        <span className="fab-tip">Chat on WhatsApp</span>
      </TrackedLeadLink>
    </div>
  );
}
