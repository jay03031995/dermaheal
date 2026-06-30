import { CLINIC, telHref, waHref } from "@/data/clinic";
import { Phone, WhatsappFilled } from "@/components/icons";

export default function FabStack() {
  const wa = waHref("Hi Dermaheal, I'd like to book a consultation.");

  return (
    <div className="fab-stack">
      <a
        className="fab-shop fab-pulse"
        href={CLINIC.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Shop Now"
      >
        <span className="fab-shop-text">Shop Now</span>
      </a>
      <a
        className="fab fab-call"
        href={telHref()}
        aria-label={`Call ${CLINIC.phone}`}
      >
        <Phone size={22} stroke={2} />
        <span className="fab-tip">Call {CLINIC.phone}</span>
      </a>
      <a
        className="fab fab-wa"
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <WhatsappFilled />
        <span className="fab-tip">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
