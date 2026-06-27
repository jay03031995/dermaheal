import { Shield, Award, Check, Sparkle, Calendar } from "@/components/icons";
import { getTrustItems } from "@/sanity/lib/fetchers";

const ICON: Record<string, React.ElementType> = {
  shield: Shield,
  award: Award,
  check: Check,
  sparkle: Sparkle,
  calendar: Calendar,
};

// Items intentionally hidden regardless of CMS content.
// Matches "FDA-approved devices", "USFDA-cleared injectables" (any FDA wording)
// and "MD Dermatologist led".
const isHidden = (text: string) =>
  /fda/i.test(text) || text.trim().toLowerCase() === "md dermatologist led";

export default async function TrustStrip() {
  const items = (await getTrustItems()).filter((it) => !isHidden(it.text));

  return (
    <div className="trust">
      <div className="trust-inner">
        <span className="trust-label">Why patients choose us</span>
        {items.map((it, i) => {
          const Icon = ICON[it.icon] ?? Shield;
          return (
            <span className="trust-item" key={it.text + i}>
              <Icon /> {it.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
