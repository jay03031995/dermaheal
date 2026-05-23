import { Shield, Award, Check, Sparkle, Calendar } from "@/components/icons";

const ITEMS = [
  { Icon: Shield, text: "MD Dermatologist led" },
  { Icon: Award, text: "FDA-approved devices" },
  { Icon: Check, text: "USFDA-cleared injectables" },
  { Icon: Sparkle, text: "Calibrated for Indian skin" },
  { Icon: Calendar, text: "6-month outcome support" },
];

export default function TrustStrip() {
  return (
    <div className="trust">
      <div className="trust-inner">
        <span className="trust-label">Why patients choose us</span>
        {ITEMS.map(({ Icon, text }) => (
          <span className="trust-item" key={text}>
            <Icon /> {text}
          </span>
        ))}
      </div>
    </div>
  );
}
