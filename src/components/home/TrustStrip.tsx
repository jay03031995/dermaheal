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
// and the older dermatologist-led badge wording.
const isHidden = (text: string) =>
  /fda/i.test(text) || /m\.?d\.?\s+dermatologist\s+led/i.test(text);

const REQUIRED_ITEMS = [
  { icon: "award", text: "Dermatologist-led" },
  { icon: "sparkle", text: "Calibrated for Indian skin" },
];

const normalizeTextKey = (text: string) =>
  text.toLowerCase().replace(/[-\s]+/g, " ").trim();

const normalizeTrustItem = (item: { icon: string; text: string }) => {
  if (/^dermatologists?\s*-?\s*led$/i.test(item.text)) {
    return { icon: "award", text: "Dermatologist-led" };
  }

  return item;
};

const normalizeTrustItems = (items: { icon: string; text: string }[]) => {
  const visibleItems = items
    .filter((it) => !isHidden(it.text))
    .map(normalizeTrustItem);
  const itemTexts = new Set(visibleItems.map((it) => normalizeTextKey(it.text)));

  const requiredItems = REQUIRED_ITEMS.filter(
    (it) => !itemTexts.has(normalizeTextKey(it.text)),
  );

  const uniqueItems = [...requiredItems, ...visibleItems].filter((item, index, all) => {
    const key = normalizeTextKey(item.text);
    return all.findIndex((it) => normalizeTextKey(it.text) === key) === index;
  });

  return uniqueItems.slice(0, 3);
};

export default async function TrustStrip() {
  const items = normalizeTrustItems(await getTrustItems());

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
