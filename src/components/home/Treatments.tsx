import { getTreatmentCards, getTreatmentCategories } from "@/sanity/lib/fetchers";
import TreatmentsClient from "./TreatmentsClient";

export default async function Treatments() {
  const [treatments, categories] = await Promise.all([
    getTreatmentCards(),
    getTreatmentCategories(),
  ]);
  // Chips are sourced from the CMS categories so they always match the
  // treatments that actually exist (e.g. Acne, Vitiligo) and stay in sync.
  const catKeys = ["All", ...categories.map((c) => c.key)];
  return <TreatmentsClient treatments={treatments} categories={catKeys} />;
}
